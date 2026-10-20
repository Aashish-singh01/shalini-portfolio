"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Default portfolio sample items aligned with all beauty & salon services
const DEFAULT_WORKS = [
  {
    id: "work-1",
    title: "Bridal Elegance",
    category: "Bridal",
    description: "Timeless royal bridal transformation with waterproof HD base, glitter eye look, and traditional finishing.",
    image: "/assets/portfolio-4.jpg",
    link: "https://www.instagram.com/makeupbyshalini21/",
    createdAt: "2024-01-05"
  },
  {
    id: "work-2",
    title: "Haldi & Festive Glow",
    category: "Festive",
    description: "Vibrant and glowing festive makeover curated specially for Haldi & Mehendi ceremonies with floral vibes.",
    image: "/assets/portfolio-2.jpg",
    link: "https://www.instagram.com/makeupbyshalini21/",
    createdAt: "2024-01-15"
  },
  {
    id: "work-3",
    title: "Soft Glam & Nude Tones",
    category: "Natural",
    description: "Subtle dewy makeup with nude tones, perfect for daytime gatherings and minimal elegant looks.",
    image: "/assets/portfolio-1.jpg",
    link: "https://www.instagram.com/makeupbyshalini21/",
    createdAt: "2024-02-01"
  },
  {
    id: "work-5",
    title: "Organic Herbal Facial",
    category: "Facials",
    description: "Botanical facial therapy for deep hydration, skin nourishment, and revitalized natural radiance.",
    image: "/assets/portfolio-facial.jpg",
    link: "https://www.instagram.com/makeupbyshalini21/",
    createdAt: "2024-03-01"
  },
  {
    id: "work-6",
    title: "Radiant Skin Cleanup",
    category: "Skin Cleanup",
    description: "Deep pore cleansing, steam extraction, and soothing herbal mask for a fresh, luminous complexion.",
    image: "/assets/portfolio-cleanup.jpg",
    link: "https://www.instagram.com/makeupbyshalini21/",
    createdAt: "2024-03-05"
  },
  {
    id: "work-7",
    title: "Rose Gold Luxury Manicure",
    category: "Manicure",
    description: "Deluxe hand care, gentle cuticle treatment, exfoliating massage, and shimmer nail finish.",
    image: "/assets/portfolio-manicure.jpg",
    link: "https://www.instagram.com/makeupbyshalini21/",
    createdAt: "2024-03-10"
  },
  {
    id: "work-9",
    title: "Sculpted Brow & Waxing",
    category: "Waxing & Eyebrows",
    description: "High-definition eyebrow arch shaping, precision threading, and gentle skin hair removal.",
    image: "/assets/portfolio-eyebrow.jpg",
    link: "https://www.instagram.com/makeupbyshalini21/",
    createdAt: "2024-03-15"
  }
];

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [works, setWorks] = useState(DEFAULT_WORKS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved works from localStorage on client mount (with automatic migration to v3)
  useEffect(() => {
    try {
      const savedWorks = localStorage.getItem("shalini_portfolio_works_v3");
      if (savedWorks) {
        const parsed = JSON.parse(savedWorks);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const cleaned = parsed.filter((item) => item.category !== "Editorial");
          setWorks(cleaned);
          setIsLoaded(true);
          return;
        }
      }

      // Check legacy storage and merge, removing any Editorial entries
      const legacySaved =
        localStorage.getItem("shalini_portfolio_works_v2") ||
        localStorage.getItem("shalini_portfolio_works");
      if (legacySaved) {
        const parsedLegacy = JSON.parse(legacySaved);
        if (Array.isArray(parsedLegacy)) {
          const userCustomWorks = parsedLegacy
            .filter((item) => item.category !== "Editorial")
            .filter((item) => !DEFAULT_WORKS.some((d) => d.id === item.id));
          setWorks([...DEFAULT_WORKS, ...userCustomWorks]);
          setIsLoaded(true);
          return;
        }
      }

      setWorks(DEFAULT_WORKS);
    } catch (error) {
      console.error("Error reading localStorage:", error);
      setWorks(DEFAULT_WORKS);
    }
    setIsLoaded(true);
  }, []);

  // Sync to localStorage whenever works change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("shalini_portfolio_works_v3", JSON.stringify(works));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [works, isLoaded]);

  // Add new work item
  const addWork = (newWork) => {
    const item = {
      id: "work-" + Date.now(),
      title: newWork.title.trim(),
      category: newWork.category.trim() || "Bridal",
      description: newWork.description?.trim() || "",
      image: newWork.image,
      link: newWork.link?.trim() || "",
      createdAt: new Date().toISOString().split("T")[0]
    };
    setWorks((prev) => [item, ...prev]);
    return item;
  };

  // Delete work by ID
  const deleteWork = (id) => {
    setWorks((prev) => prev.filter((item) => item.id !== id));
  };

  // Reset to initial sample works
  const resetWorks = () => {
    setWorks(DEFAULT_WORKS);
    try {
      localStorage.setItem("shalini_portfolio_works", JSON.stringify(DEFAULT_WORKS));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PortfolioContext.Provider value={{ works, addWork, deleteWork, resetWorks }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
