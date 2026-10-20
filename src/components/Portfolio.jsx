"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Eye, ExternalLink, X, MessageCircle } from "lucide-react";

const Portfolio = () => {
  const { works } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedWork, setSelectedWork] = useState(null);

  // Preferred aesthetic order for beauty & salon categories
  const PREFERRED_CATEGORY_ORDER = [
    "All",
    "Bridal",
    "Festive",
    "Natural",
    "Facials",
    "Skin Cleanup",
    "Manicure",
    "Waxing & Eyebrows"
  ];

  const uniqueCategories = Array.from(new Set(works.map((w) => w.category)));
  const categories = [
    "All",
    ...PREFERRED_CATEGORY_ORDER.filter((cat) => cat !== "All" && uniqueCategories.includes(cat)),
    ...uniqueCategories.filter((cat) => !PREFERRED_CATEGORY_ORDER.includes(cat))
  ];

  // Filter works by active category
  const filteredWorks =
    activeCategory === "All"
      ? works
      : works.filter((w) => w.category.toLowerCase() === activeCategory.toLowerCase());

  // Direct inquiry to WhatsApp with pre-filled message
  const handleInquire = (work) => {
    const text = encodeURIComponent(
      `Hi Shalini! I loved your "${work.title}" (${work.category}) from your portfolio. Can you share details and booking availability for this?`
    );
    window.open(`https://wa.me/916388511388?text=${text}`, "_blank");
  };

  return (
    <section
      id="portfolio"
      className="py-20 bg-gradient-to-b from-[#F5ECE3] via-[#FAF5EE] to-[#F3E9DF] dark:from-background dark:via-muted/20 dark:to-background transition-colors"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-primary font-inter font-semibold tracking-wider uppercase text-xs">
            Featured Gallery
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            My Portfolio
          </h2>
          <p className="font-inter text-lg text-muted-foreground">
            A glimpse into my creative journey, beauty transformations, and bridal artistry.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-inter font-medium transition-all duration-300 cursor-pointer ${
                  activeCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-primary text-white shadow-md scale-105"
                    : "bg-[#FAF5EE] dark:bg-card text-muted-foreground hover:bg-white hover:text-foreground border border-border/80 shadow-xs"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        {filteredWorks.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-dashed border-border max-w-md mx-auto">
            <p className="text-muted-foreground font-inter">No makeup looks found in this category.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredWorks.map((work) => (
              <div
                key={work.id}
                onClick={() => setSelectedWork(work)}
                className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-500 aspect-[4/5] bg-card border border-border cursor-pointer hover:-translate-y-1.5"
              >
                {/* Image */}
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&auto=format&fit=crop";
                  }}
                />

                {/* Gradient Overlay with Details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-inter font-medium bg-primary/90 text-white mb-2 shadow-sm">
                      {work.category}
                    </span>
                    <h3 className="font-playfair text-white text-xl font-bold mb-1">
                      {work.title}
                    </h3>
                    {work.description && (
                      <p className="font-inter text-white/80 text-xs line-clamp-2 mb-3">
                        {work.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-white/90 text-xs font-inter font-medium">
                      <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg hover:bg-white/30 transition-colors">
                        <Eye className="w-3.5 h-3.5" /> View Details
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Modal for details */}
      {selectedWork && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedWork(null)}
        >
          <div
            className="relative bg-[#FAF5EE] dark:bg-card text-foreground rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedWork(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Photo */}
              <div className="relative aspect-[4/5] md:aspect-auto bg-muted">
                <img
                  src={selectedWork.image}
                  alt={selectedWork.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Information */}
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground mb-3">
                    {selectedWork.category}
                  </span>
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-3">
                    {selectedWork.title}
                  </h3>
                  <p className="font-inter text-muted-foreground text-sm leading-relaxed mb-6">
                    {selectedWork.description ||
                      "Certified Lakmé artistry look created with professional techniques and skin-friendly products."}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <button
                    onClick={() => handleInquire(selectedWork)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-xl font-inter font-medium hover:opacity-95 transition-all shadow-md cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" /> Book This Look (WhatsApp)
                  </button>

                  {selectedWork.link && (
                    <a
                      href={selectedWork.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-[#F3EBE1] hover:bg-white dark:bg-muted dark:hover:bg-muted/80 border border-border text-foreground py-2.5 px-4 rounded-xl font-inter text-sm transition-all"
                    >
                      <ExternalLink className="w-4 h-4" /> View Reference Link
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
