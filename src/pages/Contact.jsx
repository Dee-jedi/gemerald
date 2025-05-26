import React from "react";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";
import { RiPinterestLine } from "react-icons/ri";
import { AnimatedPage, ScrollAnimatedItem } from "../utils/pageAnimations";
import ownerPhoto from "../assets/images/cover_photo.jpg";

const ContactPage = () => {
  const socialLinks = [
    {
      icon: <FiInstagram className="w-5 h-5" />,
      name: "@gemerald_scents",
      url: "https://instagram.com",
    },
    {
      icon: <FiTwitter className="w-5 h-5" />,
      name: "@gemerald_official",
      url: "https://twitter.com",
    },
    {
      icon: <FiFacebook className="w-5 h-5" />,
      name: "/GemeraldScents",
      url: "https://facebook.com",
    },
    {
      icon: <RiPinterestLine className="w-5 h-5" />,
      name: "GemeraldDesigns",
      url: "https://pinterest.com",
    },
  ];

  return (
    <AnimatedPage className="bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Signature border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-soft-amber)] to-transparent opacity-10"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* Modified grid layout */}
        <div className="flex flex-col lg:items-center">
          {/* Contact Form Column - Centered on desktop */}
          <div className="space-y-12 lg:w-full lg:max-w-2xl lg:px-4">
            <div className="space-y-4">
              <ScrollAnimatedItem amount={0.1}>
                <span className="font-script text-3xl md:text-4xl text-[var(--color-soft-amber)] block">
                  Get In Touch
                </span>
              </ScrollAnimatedItem>

              <ScrollAnimatedItem amount={0.1} delay={0.1}>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] leading-tight">
                  Contact Us
                </h1>
              </ScrollAnimatedItem>

              <ScrollAnimatedItem amount={0.2} delay={0.2}>
                <p className="text-[var(--color-text)]/80 mt-2 max-w-lg text-lg">
                  Have questions about our fragrances or need assistance with an
                  order? We'd love to hear from you.
                </p>
              </ScrollAnimatedItem>
            </div>

            <div className="space-y-8">
              <ScrollAnimatedItem amount={0.1} delay={0.3}>
                <div className="flex items-start gap-5">
                  <div
                    className="p-3 rounded-full text-[var(--color-wood)]"
                    style={{ backgroundColor: "rgba(222, 184, 135, 0.1)" }}
                  >
                    <HiMail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl mb-2">
                      Email
                    </h3>
                    <a
                      href="mailto:contact@gemerald.com"
                      className="text-[var(--color-text)]/80 hover:text-[var(--color-wood)] transition-colors text-lg"
                    >
                      contact@gemerald.com
                    </a>
                  </div>
                </div>
              </ScrollAnimatedItem>

              <ScrollAnimatedItem amount={0.1} delay={0.4}>
                <div className="flex items-start gap-5">
                  <div
                    className="p-3 rounded-full text-[var(--color-wood)]"
                    style={{ backgroundColor: "rgba(222, 184, 135, 0.1)" }}
                  >
                    <HiPhone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl mb-2">
                      Phone
                    </h3>
                    <a
                      href="tel:+2347081691700"
                      className="text-[var(--color-text)]/80 hover:text-[var(--color-wood)] transition-colors text-lg"
                    >
                      +234 708 169 1700
                    </a>
                  </div>
                </div>
              </ScrollAnimatedItem>
            </div>

            {/* Social Media Section */}
            <div>
              <ScrollAnimatedItem amount={0.1} delay={0.6}>
                <h3 className="font-serif text-2xl mb-6 ">Connect With Us</h3>
              </ScrollAnimatedItem>

              {/* Desktop - Full handles */}
              <ScrollAnimatedItem amount={0.2} delay={0.7}>
                <div className="hidden md:flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-3 border border-[var(--color-border)] rounded-xl hover:border-[var(--color-wood)] hover:bg-[var(--color-wood)]/5 transition-all duration-300"
                    >
                      <span className="text-[var(--color-wood)]">
                        {social.icon}
                      </span>
                      <span className="text-sm font-medium">{social.name}</span>
                    </a>
                  ))}
                </div>
              </ScrollAnimatedItem>

              {/* Mobile - Icons only */}
              <ScrollAnimatedItem amount={0.2} delay={0.7}>
                <div className="md:hidden flex gap-5 items-center justify-center">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 border border-[var(--color-border)] rounded-full hover:border-[var(--color-wood)] hover:bg-[var(--color-wood)]/5 transition-all duration-300"
                      aria-label={social.name}
                    >
                      {React.cloneElement(social.icon, {
                        className: "w-6 h-6 text-[var(--color-wood)]",
                      })}
                    </a>
                  ))}
                </div>
              </ScrollAnimatedItem>
            </div>
          </div>

          {/* Owner's Photo Column - Hidden on desktop */}
          <ScrollAnimatedItem amount={0.1} delay={0.8}>
            <div className="lg:hidden relative group h-full mt-12">
              <div className="relative h-full before:absolute before:inset-0 before:bg-[var(--color-wood)] before:mix-blend-overlay before:opacity-5 before:rounded-2xl overflow-hidden">
                <img
                  src={ownerPhoto}
                  alt="Gemerald Founder"
                  className="w-full h-full max-h-[80vh] object-cover rounded-2xl shadow-xl group-hover:shadow-[0_20px_50px_rgba(183,_93,_47,_0.2)] transition-all duration-500"
                  style={{ aspectRatio: "3/4" }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-2 border-[var(--color-soft-amber)] opacity-30"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 border border-[var(--color-wood)] opacity-30"></div>

              {/* Owner's Signature */}
              <div className="absolute bottom-8 left-8 bg-[color-mix(in_srgb,var(--color-bg),transparent_30%)] px-6 py-3 rounded-lg backdrop-blur-sm border border-[var(--color-border)]">
                <p className="font-script text-2xl text-[var(--color-wood)]">
                  - The Gemerald Team
                </p>
              </div>
            </div>
          </ScrollAnimatedItem>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ContactPage;
