// Admin-only product writes. Kept separate from products.js so visitors never
// download the Storage SDK.
import {
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  updateDoc,
} from "firebase/firestore/lite";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { app, db } from "../lib/firebase";
import { invalidateProductsCache, productsRef } from "./products";

const storage = getStorage(app);

const MAX_IMAGE_SIZE = 1400;
const IMAGE_QUALITY = 0.85;

// Resizes to at most MAX_IMAGE_SIZE px on the long edge and re-encodes as WebP,
// typically cutting phone photos from several MB to ~150KB.
const compressImage = async (file) => {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_IMAGE_SIZE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/webp", IMAGE_QUALITY)
    );
    // Fall back to the original if the browser can't encode WebP or it got bigger.
    if (!blob || blob.type !== "image/webp" || blob.size >= file.size) return file;
    return blob;
  } catch {
    return file;
  }
};

export const uploadProductImage = async (file) => {
  const image = await compressImage(file);
  const baseName = file.name
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-");
  const extension = image.type === "image/webp" ? "webp" : file.name.split(".").pop();
  const path = `products/${Date.now()}-${baseName}.${extension}`;
  const fileRef = storageRef(storage, path);

  await uploadBytes(fileRef, image, {
    contentType: image.type,
    cacheControl: "public, max-age=31536000",
  });
  return { image: await getDownloadURL(fileRef), imagePath: path };
};

const deleteProductImage = async (imagePath) => {
  if (!imagePath) return;
  try {
    await deleteObject(storageRef(storage, imagePath));
  } catch (err) {
    // An orphaned image is harmless; don't fail the whole operation over it.
    console.warn("Could not delete product image", imagePath, err);
  }
};

export const createProduct = async (data) => {
  const latest = await getDocs(
    query(productsRef, orderBy("id", "desc"), limit(1))
  );
  const id = latest.empty ? 1 : latest.docs[0].data().id + 1;
  const productRef = doc(productsRef, String(id));

  await runTransaction(db, async (tx) => {
    if ((await tx.get(productRef)).exists()) {
      throw new Error("Another product was just created. Please try again.");
    }
    tx.set(productRef, {
      ...data,
      id,
      order: Date.now(),
      featuredOrder: data.featured ? Date.now() : null,
    });
  });

  invalidateProductsCache();
  return id;
};

export const updateProduct = async (product, changes) => {
  const update = { ...changes };
  if (changes.featured && !product.featured) update.featuredOrder = Date.now();
  if (!changes.featured) update.featuredOrder = null;

  await updateDoc(doc(productsRef, String(product.id)), update);
  if (changes.imagePath && changes.imagePath !== product.imagePath) {
    await deleteProductImage(product.imagePath);
  }
  invalidateProductsCache();
};

export const deleteProduct = async (product) => {
  await deleteDoc(doc(productsRef, String(product.id)));
  await deleteProductImage(product.imagePath);
  invalidateProductsCache();
};
