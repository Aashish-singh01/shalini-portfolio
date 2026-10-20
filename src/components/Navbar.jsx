"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, Lock } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Portfolio", href: "/#portfolio" },
    { name: "Contact", href: "/#contact" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-soft py-3 border-b border-border/50"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span
              className={`font-playfair text-xl font-bold tracking-tight block transition-colors ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              Shalini Singh
            </span>
            <span
              className={`font-inter text-[10px] uppercase tracking-widest block font-medium transition-colors ${
                isScrolled ? "text-muted-foreground" : "text-white/80"
              }`}
            >
              Bridal Makeup Artist
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-inter text-sm font-medium transition-colors hover:text-primary ${
                isScrolled ? "text-foreground/80" : "text-white/90 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Admin Section Link Button */}
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-inter font-medium bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 shadow-sm transition-all hover:scale-105"
            title="Admin Dashboard for Shalini to manage portfolio"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Admin</span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/admin"
            className="p-2 rounded-lg bg-primary/20 text-white text-xs flex items-center justify-center"
            title="Admin"
          >
            <Lock className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 py-6 space-y-4 shadow-xl animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-inter text-base font-medium text-foreground hover:text-primary transition-colors py-2"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-border">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-inter text-sm font-medium shadow-sm"
            >
              <Lock className="w-4 h-4" /> Admin Section (Manage Work)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
