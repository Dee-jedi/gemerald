import React from "react";
import { FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";
import { RiPinterestLine } from "react-icons/ri";

const Footer = () => {
  const socialLinks = [
    {
      icon: <FiInstagram />,
      name: "Instagram",
      url: "https://instagram.com/gemerald_scents",
    },
    {
      icon: <FiTwitter />,
      name: "Twitter",
      url: "https://twitter.com/gemerald_official",
    },
    {
      icon: <FiFacebook />,
      name: "Facebook",
      url: "https://facebook.com/GemeraldScents",
    },
    {
      icon: <RiPinterestLine />,
      name: "Pinterest",
      url: "https://pinterest.com/GemeraldDesigns",
    },
  ];

  return (
    <footer className="bg-[color-mix(in_srgb,var(--color-bg),black_5%)] border-t border-[var(--color-border)]">
      {/* Signature gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-soft-amber)] to-transparent opacity-10"></div>

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col items-center gap-6">
        {/* Social Links */}
        <div className="flex gap-4 flex-wrap justify-center">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-[14px] border border-[var(--color-border)] rounded-full hover:border-[var(--color-wood)] hover:bg-[var(--color-wood)]/5 transition-all duration-300"
              aria-label={social.name}
            >
              {React.cloneElement(social.icon, {
                className: "w-[22px] h-[22px] text-[var(--color-wood)]",
              })}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-[var(--color-text)]/60 text-sm text-center">
          © {new Date().getFullYear()} Gemerald Scents. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
