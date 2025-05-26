import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/layout";
import {
  Home,
  Products,
  About,
  Contact,
  NotFound,
  ProductDetail,
} from "./pages";
import { AnimatePresence } from "framer-motion";
import MobileBottomNav from "./components/layout/MobileBottomNav";
import { CartProvider } from "./context/CartContext"; // Import the CartProvider

const App = () => {
  const location = useLocation();

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            // Delay a bit to ensure new page renders before scrolling
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "instant" });
            }, 10);
          }}
        >
          <main className="flex-grow pb-16 md:pb-0">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              {/* New product detail route */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </AnimatePresence>
        <MobileBottomNav />
      </div>
    </CartProvider>
  );
};

export default App;
