"use client";

import React, { useState, useEffect } from "react";

const Footer = () => {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-card border-t border-border py-10">
      <div className="container mx-auto px-4 text-center">
        <p className="font-playfair text-lg font-bold text-foreground mb-1">
          Shalini Singh
        </p>
        <p className="font-inter text-xs text-muted-foreground mb-4">
          Lakmé Certified Professional Makeup Artist • Lucknow
        </p>

        <p className="font-inter text-sm text-muted-foreground">
          © {year} Shalini Singh. All rights reserved.
        </p>
        <p className="font-inter text-xs text-muted-foreground mt-2">
          Designed & Developed with ❤️ by{" "}
          <a
            href="https://www.linkedin.com/in/ashish-singh-0aa560281/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline transition-colors font-medium"
          >
            Ashish Singh
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
