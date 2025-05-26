import { AnimatedPage } from "../utils/pageAnimations";
import { LandingHero } from "../components/landing/LandingHero";
import { FeaturedProducts } from "../components/products/FeaturedProducts";
import Testimonials from "../components/landing/Testimonials";
import Footer from "../components/landing/Footer";

const Home = () => {
  const handleExplore = () => {
    console.log("User clicked explore");
  };

  return (
    <AnimatedPage>
      <LandingHero onExplore={handleExplore} />
      <div className="bg-[var(--color-bg)]">
        <FeaturedProducts />
      </div>
      <Testimonials />
      <Footer />
    </AnimatedPage>
  );
};

export default Home;
