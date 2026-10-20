"use client";

import React from "react";
import {
  Heart,
  Sparkles,
  Flower2,
  Droplets,
  Feather,
  Eye,
  Hand,
  Calendar,
  ArrowRight
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: "Bridal Makeup",
      description:
        "Bespoke bridal transformations with HD and waterproof finishes, designed to keep you radiant all day.",
      category: "Signature Artistry"
    },
    {
      icon: Sparkles,
      title: "Party & Event Makeup",
      description:
        "Glamorous looks for receptions, engagements, cocktails, and festive celebrations tailored to your attire.",
      category: "Occasion Styling"
    },
    {
      icon: Flower2,
      title: "Rejuvenating Facials",
      description:
        "Hydrating, brightening, and skin-repairing facials tailored to nourish and restore your natural glow.",
      category: "Skincare"
    },
    {
      icon: Droplets,
      title: "Deep Skin Cleanup",
      description:
        "Steaming, blackhead & whitehead extraction, gentle pore exfoliation, and soothing face packs for refreshed skin.",
      category: "Skin Treatment"
    },
    {
      icon: Feather,
      title: "Waxing Services",
      description:
        "Gentle, hygienic face and full-body waxing for smooth, silky, hair-free skin with gentle aftercare.",
      category: "Smooth Skin"
    },
    {
      icon: Eye,
      title: "Eyebrow Shaping & Threading",
      description:
        "Precision eyebrow threading, arch shaping, and facial hair grooming to perfectly define and accentuate your face.",
      category: "Brows & Face"
    },
    {
      icon: Hand,
      title: "Luxury Manicure",
      description:
        "Pampering hand care, nail shaping, cuticle therapy, rejuvenating scrub, and flawless polish finish.",
      category: "Nail Care"
    }
  ];

  const handleBookService = (serviceName) => {
    const text = encodeURIComponent(
      `Hi Shalini! I would like to inquire about your "${serviceName}" service and check available appointment slots.`
    );
    window.open(`https://wa.me/916388511388?text=${text}`, "_blank");
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-inter font-semibold tracking-wider uppercase text-xs">
            What I Offer
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Beauty & Makeup Services
          </h2>
          <p className="font-inter text-lg text-muted-foreground">
            From signature bridal and party makeup to revitalizing salon therapies, tailored to elevate your natural beauty.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card p-6 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elegant hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-[10px] font-inter font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {service.category}
                  </span>
                </div>
                <h3 className="font-playfair text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="font-inter text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleBookService(service.title)}
                className="mt-2 text-xs font-inter font-medium text-primary hover:text-primary/80 inline-flex items-center gap-1.5 transition-colors group-hover:gap-2 cursor-pointer pt-2 border-t border-border/50"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Custom Packages Banner */}
        <div className="mt-14 max-w-4xl mx-auto text-center p-8 rounded-2xl bg-card border border-border shadow-sm">
          <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">
            Looking for Custom Bridal or Salon Packages?
          </h3>
          <p className="font-inter text-sm text-muted-foreground max-w-2xl mx-auto mb-6">
            Get personalized combo packages tailored for brides, bridesmaids, and pre-wedding grooming sessions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-inter font-medium px-6 py-3 rounded-xl text-sm transition-all shadow-md hover:scale-105 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Contact for Consultation</span>
            </a>
            <button
              type="button"
              onClick={() => handleBookService("Custom Beauty Package")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-border bg-background hover:bg-muted font-inter font-medium px-6 py-3 rounded-xl text-sm transition-all cursor-pointer text-foreground"
            >
              <span>WhatsApp Inquiry</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
