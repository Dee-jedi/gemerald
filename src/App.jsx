import { Routes, Route, useLocation } from "react-router-dom";
import { Header, Footer } from "./components/layout";
import { Home, Products, About, Contact, NotFound } from "./pages";
import { AnimatePresence } from "framer-motion";
import MobileBottomNav from "./components/layout/MobileBottomNav"; // Import the new component

const App = () => {
  const location = useLocation();

  return (
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
          {" "}
          {/* Added padding-bottom for mobile nav */}
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </AnimatePresence>
      <Footer />
      <MobileBottomNav /> {/* Add the bottom navigation */}
    </div>
  );
};

export default App;
