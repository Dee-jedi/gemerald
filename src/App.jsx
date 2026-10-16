import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/layout";
import { Home } from "./pages";
import { CartProvider } from "./context/CartContext"; // Import the CartProvider
import { AuthProvider } from "./context/AuthContext";
import AdminRoute from "./components/admin/AdminRoute";

// Home loads up front; every other page is fetched when first visited.
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const CartPage = lazy(() => import("./pages/CartPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProductForm = lazy(() => import("./pages/admin/ProductForm"));

const PageFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <span className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-wood)] border-t-transparent" />
  </div>
);

const App = () => {
  const location = useLocation();

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-grow">
            <Suspense fallback={<PageFallback />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route
                  path="/admin/products/new"
                  element={
                    <AdminRoute>
                      <ProductForm />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/products/:id/edit"
                  element={
                    <AdminRoute>
                      <ProductForm />
                    </AdminRoute>
                  }
                />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
