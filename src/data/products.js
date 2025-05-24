import product1 from "../assets/images/product_1.jpg";
import product2 from "../assets/images/product_2.jpg";
import product3 from "../assets/images/product_3.jpg";
import product4 from "../assets/images/product_4.jpg";
import product5 from "../assets/images/product_5.jpg";
import product6 from "../assets/images/product_6.jpg";
import product7 from "../assets/images/product_7.jpg";
import product8 from "../assets/images/product_8.jpg";
import product9 from "../assets/images/product_9.jpg";
import product10 from "../assets/images/product_10.jpg";
import product11 from "../assets/images/product_11.jpg";

export const featuredProducts = [
  {
    id: 1,
    name: "Amber Nocturne",
    price: "50,000",
    category: "Perfume",
    image: product1,
    rating: 4.3,
  },
  {
    id: 2,
    name: "Velvet Woods Aromatic Candle",
    price: "25,000",
    category: "Candle",
    image: product2,
    rating: 3.9,
  },
  {
    id: 3,
    name: "Blackberry Spice Candle",
    price: "43,500",
    category: "Candle",
    image: product3,
    rating: 4.5,
  },
];

export const allProducts = [
  ...featuredProducts,
  {
    id: 4,
    name: "Golden Dusk Elixir Perfume",
    price: "19,750",
    category: "Perfume",
    image: product4,
    rating: 4.1,
  },
  {
    id: 5,
    name: "Ivory Petals Eau de Parfum",
    price: "12,750",
    category: "Perfume",
    image: product5,
    rating: 3.8,
  },
  {
    id: 6,
    name: "Sandalwood Whisper Mist",
    price: "23,000",
    category: "Perfume",
    image: product6,
    rating: 4.0,
  },
  {
    id: 7,
    name: "Midnight Amber Eau Fraîche",
    price: "21,500",
    category: "Perfume",
    image: product7,
    rating: 3.6,
  },
  {
    id: 8,
    name: "Crimson Bloom Fragrance",
    price: "17,850",
    category: "Perfume",
    image: product8,
    rating: 4.2,
  },
  {
    id: 9,
    name: "Silken Musk Harmony",
    price: "23,000",
    category: "Perfume",
    image: product9,
    rating: 4.7,
  },
  {
    id: 10,
    name: "Twilight Fig Infusion",
    price: "33,000",
    category: "Perfume",
    image: product10,
    rating: 3.5,
  },
  {
    id: 11,
    name: "Ocean Driftwood Cologne",
    price: "15,000",
    category: "Perfume",
    image: product11,
    rating: 4.6,
  },
];
