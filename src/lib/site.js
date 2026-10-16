// Business details shared across the site (cart checkout, menu, footer).
import { FiInstagram, FiFacebook } from "react-icons/fi";
import { RiPinterestLine } from "react-icons/ri";
import { AiFillTikTok } from "react-icons/ai";

export const WHATSAPP_NUMBER = "2347081691700";

export const whatsappLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

export const SOCIAL_LINKS = [
  {
    icon: FiInstagram,
    name: "@gemerald_ace",
    url: "https://instagram.com/gemerald_ace",
  },
  {
    icon: AiFillTikTok,
    name: "@gemerald_official",
    url: "https://tiktok.com/@gemeraldace",
  },
  {
    icon: FiFacebook,
    name: "/GemeraldScents",
    url: "https://facebook.com/gemeraldace",
  },
  {
    icon: RiPinterestLine,
    name: "GemeraldDesigns",
    url: "https://pinterest.com/biszayn1",
  },
];
