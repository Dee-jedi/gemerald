import { Routes, Route, useLocation } from "react-router-dom";
import { Header, Footer } from "./components/layout";
import { Home, Products, About, Contact, NotFound } from "./pages";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const location = useLocation();

  return (
    <>
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
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default App;
