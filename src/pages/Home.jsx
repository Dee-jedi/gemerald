import { AnimatedPage } from "../utils/pageAnimations";
import { LandingHero } from "../components/landing/LandingHero";
import { FeaturedProducts } from "../components/products/FeaturedProducts";
import GiftSpotlight from "../components/landing/GiftSpotlight";
import HowToOrder from "../components/landing/HowToOrder";
import BrandStory from "../components/landing/BrandStory";
import Testimonials from "../components/landing/Testimonials";
import Footer from "../components/landing/Footer";

const Home = () => {
  return (
    <AnimatedPage>
      <title>Gemerald | Luxury Candles, Diffusers &amp; Perfumes</title>
      <LandingHero />
      <div className="bg-[var(--color-bg)]">
        <FeaturedProducts />
        <GiftSpotlight />
        <HowToOrder />
        <BrandStory />
      </div>
      <Testimonials />
      <Footer />
    </AnimatedPage>
  );
};

export default Home;
