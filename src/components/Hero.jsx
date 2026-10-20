"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, Award } from "lucide-react";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Preload Priority */}
      <div className="absolute inset-0">
        <Image
          src="/assets/hero-banner.jpg"
          alt="Shalini Singh Professional Makeup Artist Studio"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/25 via-transparent to-secondary/20 mix-blend-screen pointer-events-none" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white pt-20 pb-16">
        <a
          href="#about"
          className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-4 text-xs md:text-sm font-inter tracking-wider uppercase bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30 animate-fade-in hover:bg-white/30 transition-colors cursor-pointer"
          title="Click to view official Lakmé certification"
        >
          <Award className="w-4 h-4 text-white" />
          <span>Lakmé Certified Makeup Artist • View Certificate</span>
        </a>

        <h1 className="font-playfair text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in tracking-tight leading-tight">
          Professional Makeup Artist in Lucknow
        </h1>

        <p className="font-inter text-base sm:text-xl md:text-2xl mb-4 max-w-2xl mx-auto animate-fade-in opacity-90 font-light">
          Lakmé-Trained Makeup Artist | Bridal & Occasion Makeup
        </p>

        <p className="font-inter text-base md:text-lg mb-8 max-w-3xl mx-auto animate-fade-in opacity-80 leading-relaxed font-light">
          Specializing in Bridal, Party, and Occasion Makeup Artistry, along with Professional Product Knowledge & Skin Preparation, and Hairstyling.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
          <button
            onClick={scrollToContact}
            className="w-full sm:w-auto bg-white text-primary hover:bg-white/95 font-inter font-medium px-8 py-4 rounded-xl text-lg shadow-elegant transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center justify-center cursor-pointer"
          >
            Book a Consultation
          </button>
          <a
            href="#portfolio"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-inter font-medium px-8 py-4 rounded-xl text-lg border border-white/30 transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center justify-center"
          >
            Explore My Work
          </a>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-7 h-7 text-white opacity-75" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
