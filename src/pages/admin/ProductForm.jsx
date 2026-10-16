import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ImagePlus, RefreshCw } from "lucide-react";
import { AnimatedPage } from "../../utils/pageAnimations";
import { useGoBack } from "../../hooks/useGoBack";
import Select from "../../components/ui/Select";
import AutoTextarea from "../../components/ui/AutoTextarea";
import { getProductById } from "../../services/products";
import {
  createProduct,
  updateProduct,
  uploadProductImage,
} from "../../services/productAdmin";

const CATEGORIES = ["Candle", "Diffuser", "Gift Set", "Perfume"];
const MAX_IMAGE_MB = 10;

const emptyForm = {
  name: "",
  price: "",
  category: "Candle",
  size: "",
  scent_type: "",
  description: "",
  details: "",
  featured: false,
};

const toForm = (product) => ({
  name: product.name ?? "",
  price: String(product.price ?? "").replace(/,/g, ""),
  category: product.category ?? "Candle",
  size: product.size ?? "",
  scent_type: product.scent_type ?? "",
  description: product.description ?? "",
  details: (product.details ?? []).join("\n"),
  featured: Boolean(product.featured),
});

const fromForm = (form) => ({
  name: form.name.trim(),
  // Prices are stored formatted (e.g. "45,000"), matching the existing catalog.
  price: Number(form.price).toLocaleString("en-US"),
  category: form.category,
  size: form.size.trim(),
  scent_type: form.scent_type.trim(),
  description: form.description.trim(),
  details: form.details
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean),
  featured: form.featured,
});

const inputClass =
  "w-full rounded-xl bg-[color-mix(in_srgb,var(--color-card),black_38%)] border border-white/10 px-4 py-3 text-[var(--color-text)] placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-[var(--color-wood)] focus:border-transparent transition";

// Renders as a <label> for native inputs. Custom controls pass as="div":
// a wrapping <label> would forward clicks inside the dropdown menu back to
// its button and immediately reopen it.
const Field = ({ label, hint, children, as: Wrapper = "label" }) => (
  <Wrapper className="block space-y-1.5">
    <span className="block text-sm font-medium text-[var(--color-wood)]">
      {label}
    </span>
    {children}
    {hint && <span className="block text-xs text-white/40">{hint}</span>}
  </Wrapper>
);

const ProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  // Cancel and save return to wherever the admin opened the form from
  // (Home, Products or the product page), not a fixed page.
  const goBack = useGoBack(isEdit ? `/products/${id}` : "/products");
  const fileInputRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isEdit) return;
    let cancelled = false;
    getProductById(id)
      .then((item) => {
        if (cancelled) return;
        setProduct(item);
        if (item) {
          setForm(toForm(item));
          setPreview(item.image);
        }
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setError("Couldn't load this product.");
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id, isEdit]);

  // Release object URLs created for local previews.
  useEffect(() => {
    if (!imageFile) return;
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const set = (field) => (e) =>
    setForm((f) => ({
      ...f,
      [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const pickFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setError(`Images must be under ${MAX_IMAGE_MB}MB.`);
      return;
    }
    setError(null);
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim()) return setError("Please enter a product name.");
    if (!(Number(form.price) > 0)) return setError("Please enter a valid price.");
    if (!isEdit && !imageFile) return setError("Please add a product image.");

    setSaving(true);
    try {
      const data = fromForm(form);
      if (imageFile) Object.assign(data, await uploadProductImage(imageFile));

      if (isEdit) {
        await updateProduct(product, data);
        // The page we return to refetches, so the edit shows up there.
        goBack();
      } else {
        // A new product has no page to go back to; show it, replacing the
        // form in history so Back then returns to where the admin started.
        const newId = await createProduct(data);
        navigate(`/products/${newId}`, { replace: true });
      }
    } catch (err) {
      console.error("Failed to save product", err);
      setError(
        err.code === "permission-denied" || err.code === "storage/unauthorized"
          ? "You don't have permission to do this. Make sure your account is an admin."
          : err.message || "Couldn't save the product. Please try again."
      );
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-wood)] border-t-transparent" />
      </div>
    );
  }

  if (isEdit && !product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <h1 className="font-serif text-2xl">{error ?? "Product not found"}</h1>
        <Link to="/products" className="text-[var(--color-soft-amber)]">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <AnimatedPage className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center gap-2 text-[var(--color-soft-amber)] hover:text-[var(--color-wood)] transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Cancel</span>
        </button>

        <h1 className="mt-6 font-serif text-3xl md:text-4xl">
          {isEdit ? `Edit ${product.name}` : "Add a new product"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
        >
          {/* Image */}
          <div>
            <span className="text-sm font-medium text-[var(--color-wood)]">
              Image
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                pickFile(e.dataTransfer.files?.[0]);
              }}
              className={`group relative mt-1.5 flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed transition-colors cursor-pointer ${
                isDragging
                  ? "border-[var(--color-wood)] bg-[rgba(222,184,135,0.08)]"
                  : "border-white/10 bg-[var(--color-card)] hover:border-white/25"
              }`}
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Product preview"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">
                    <RefreshCw className="h-4 w-4" />
                    Replace image
                  </span>
                </>
              ) : (
                <span className="flex flex-col items-center gap-3 px-6 text-center text-white/50">
                  <ImagePlus className="h-10 w-10 text-[var(--color-wood)]" />
                  <span className="text-sm">
                    Click to choose an image
                    <br />
                    or drag one here
                  </span>
                </span>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => pickFile(e.target.files?.[0])}
            />
            <p className="mt-2 text-xs text-white/40">
              JPG, PNG or WebP, up to {MAX_IMAGE_MB}MB. Square images look best.
              Images are resized and compressed automatically.
            </p>
          </div>

          {/* Details */}
          <div className="space-y-5">
            <Field label="Name">
              <input
                className={inputClass}
                value={form.name}
                onChange={set("name")}
                placeholder="e.g. Whisper"
              />
            </Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Price (₦)">
                <input
                  className={inputClass}
                  type="number"
                  inputMode="numeric"
                  min="0"
                  step="1"
                  value={form.price}
                  onChange={set("price")}
                  placeholder="20000"
                />
              </Field>
              <Field label="Category" as="div">
                <Select
                  label="Category"
                  options={CATEGORIES.map((c) => ({ value: c, label: c }))}
                  value={form.category}
                  onChange={(category) => setForm((f) => ({ ...f, category }))}
                />
              </Field>
            </div>

            <Field label="Size">
              <input
                className={inputClass}
                value={form.size}
                onChange={set("size")}
                placeholder="e.g. 250g scented candle"
              />
            </Field>

            <Field label="Scents" hint="Comma-separated">
              <input
                className={inputClass}
                value={form.scent_type}
                onChange={set("scent_type")}
                placeholder="e.g. Kiwi & Peach, Saffron, Coffee Arabica"
              />
            </Field>

            <Field label="Description">
              <AutoTextarea
                minRows={3}
                className={inputClass}
                value={form.description}
                onChange={set("description")}
              />
            </Field>

            <Field
              label="Features"
              hint="Press Enter after each feature. Every line shows as a bullet point on the product page."
            >
              <AutoTextarea
                minRows={4}
                className={inputClass}
                value={form.details}
                onChange={set("details")}
                placeholder={"60+ hours burn time\nRecyclable glass container"}
              />
            </Field>

            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 px-4 py-3">
              <span>
                <span className="block text-sm font-medium">Featured</span>
                <span className="block text-xs text-white/40">
                  Show this product in Featured Fragrances on the home page
                </span>
              </span>
              <input
                type="checkbox"
                checked={form.featured}
                onChange={set("featured")}
                className="peer sr-only"
              />
              <span className="relative h-6 w-11 shrink-0 rounded-full bg-white/15 transition-colors peer-checked:bg-[var(--color-accent)] after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5" />
            </label>

            {error && (
              <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[rgba(222,184,135,0.3)] py-4 text-lg font-medium text-[#deb887] hover:bg-[rgba(222,184,135,0.4)] transition-colors cursor-pointer disabled:opacity-60"
            >
              {saving ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#deb887] border-t-transparent" />
                  {imageFile ? "Uploading…" : "Saving…"}
                </>
              ) : isEdit ? (
                "Save changes"
              ) : (
                "Upload product"
              )}
            </button>
          </div>
        </form>
      </div>
    </AnimatedPage>
  );
};

export default ProductForm;
