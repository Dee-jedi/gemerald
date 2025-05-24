import { AnimatedPage } from "../utils/pageAnimations";
import { LandingHero } from "../components/landing/LandingHero";
import { FeaturedProducts } from "../components/products/FeaturedProducts";

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
    </AnimatedPage>
  );
};

export default Home;
