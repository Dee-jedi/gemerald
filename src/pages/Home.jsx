import { AnimatedPage } from "../utils/pageAnimations";
import { LandingHero } from "../components/landing/LandingHero";
import { FeaturedProducts } from "../components/products/FeaturedProducts";
import Testimonials from "../components/landing/Testimonials";

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
    </AnimatedPage>
  );
};

export default Home;
