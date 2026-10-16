import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore/lite";
import { db } from "../lib/firebase";

export const productsRef = collection(db, "products");

const toProduct = (snap) => ({ ...snap.data(), id: Number(snap.id) });

let allProductsCache = null;
export const invalidateProductsCache = () => {
  allProductsCache = null;
};

export const getAllProducts = async () => {
  if (!allProductsCache) {
    allProductsCache = getDocs(query(productsRef, orderBy("order")))
      .then((snapshot) => snapshot.docs.map(toProduct))
      .catch((err) => {
        invalidateProductsCache();
        throw err;
      });
  }
  return allProductsCache;
};

export const getFeaturedProducts = async () => {
  const snapshot = await getDocs(
    query(productsRef, where("featured", "==", true))
  );
  return snapshot.docs
    .map(toProduct)
    .sort((a, b) => a.featuredOrder - b.featuredOrder);
};

export const getProductById = async (id) => {
  if (allProductsCache) {
    const cached = (await allProductsCache).find((p) => p.id === Number(id));
    if (cached) return cached;
  }
  const snap = await getDoc(doc(productsRef, String(id)));
  return snap.exists() ? toProduct(snap) : null;
};

export const getRelatedProducts = async (product, count = 4) => {
  const all = await getAllProducts();
  return all
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, count);
};
