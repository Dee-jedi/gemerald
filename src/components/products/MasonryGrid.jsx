// src/components/products/MasonryGrid.jsx
import Masonry from "react-masonry-css";
import { ProductCard } from "./ProductCard";
import { ScrollAnimatedItem } from "../../utils/pageAnimations";

const breakpointColumnsObj = {
  default: 4,
  1280: 4,
  1024: 4,
  768: 3,
  640: 2,
  0: 2,
};

const MasonryGrid = ({ products }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="masonry-grid"
      columnClassName="masonry-column"
    >
      {products.map((product, index) => (
        <ScrollAnimatedItem
          key={product.id}
          amount={0.1}
          variants={{
            offscreen: { y: 40, opacity: 0 },
            onscreen: {
              y: 0,
              opacity: 1,
              transition: { delay: Math.floor(index / 5) * 0.1 },
            },
          }}
        >
          <ProductCard product={product} />
        </ScrollAnimatedItem>
      ))}
    </Masonry>
  );
};

export default MasonryGrid;
