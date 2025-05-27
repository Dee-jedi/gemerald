import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/layout";
import {
  Home,
  Products,
  About,
  Contact,
  NotFound,
  ProductDetail,
  CartPage,
} from "./pages";
import MobileBottomNav from "./components/layout/MobileBottomNav";
import { CartProvider } from "./context/CartContext"; // Import the CartProvider

const App = () => {
  const location = useLocation();

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow pb-16 md:pb-0">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            {/* New product detail route */}

            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <MobileBottomNav />
      </div>
    </CartProvider>
  );
};

export default App;
