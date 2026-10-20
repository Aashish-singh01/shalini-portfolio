"use client";

import React, { useState } from "react";
import {
  Award,
  Users,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ZoomIn,
  X,
  FileText,
  Calendar,
  Clock,
  MapPin
} from "lucide-react";

const certificates = [
  {
    id: "lakme",
    title: "Lakmé Academy Certificate of Merit",
    subtitle: "Professional Makeup Course with Global Trends",
    description:
      "Formally awarded to Shalini Singh for successfully completing the accredited 220-hour Professional Makeup Course with Global Trends at Lakmé Academy powered by Aptech.",
    badge: "Lakmé Certified",
    tag: "Academy Certification",
    image: "/assets/lakme-certificate.png",
    aspect: "aspect-[3/4]",
    meta: [
      { label: "Course Duration", value: "220 Hours Intensive", icon: Clock },
      { label: "Training Centre", value: "Lucknow - Indiranagar", icon: MapPin },
      { label: "Certificate Serial", value: "1119C1566683", icon: FileText, mono: true },
      { label: "Issued By", value: "MEL Training & Assessment", icon: Calendar }
    ]
  },
  {
    id: "dazzle",
    title: "Miss & Mrs India Dazzle Queen -25",
    subtitle: "Certificate of Appreciation • Makeup & Style Partner",
    description:
      "Formally presented to Shalini for outstanding makeup and styling artistry as the official Makeup & Style Partner at the prestigious Miss & Mrs India Dazzle Queen -25 pageant.",
    badge: "Official Partner",
    tag: "Pageant Recognition",
    image: "/assets/dazzle-queen-certificate.jpg",
    aspect: "aspect-[4/3]",
    meta: [
      { label: "Recognition", value: "Outstanding Artistry", icon: Award },
      { label: "Official Role", value: "Makeup & Style Partner", icon: Sparkles },
      { label: "Date Awarded", value: "06 / 09 / 2025", icon: Calendar },
      { label: "Presented At", value: "Miss & Mrs India Pageant", icon: MapPin }
    ]
  }
];

const About = () => {
  const [selectedCert, setSelectedCert] = useState(certificates[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const highlights = [
    {
      icon: Award,
      title: "Lakmé Certified",
      description: "Accredited Professional Makeup Course with Global Trends from Lakmé Academy."
    },
    {
      icon: Users,
      title: "220+ Hours Training",
      description: "Rigorous hands-on practical artistry in bridal, festive, and occasion aesthetics."
    },
    {
      icon: Sparkles,
      title: "Versatile Artistry",
      description: "Specializing in HD bridal transformations, radiant dewy bases, and custom hairstyling."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background via-accent/15 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-inter font-semibold tracking-wider uppercase text-xs">
            Professional Background
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            About Shalini Singh
          </h2>
          <p className="font-inter text-lg text-muted-foreground leading-relaxed">
            I am a certified professional makeup artist trained at the premier Lakmé Academy, Lucknow.
            Combining technical precision with creative passion, I specialize in crafting flawless, long-lasting
            looks that celebrate your individuality.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="bg-card p-7 rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1.5 border border-border"
            >
              <div className="w-14 h-14 mb-5 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-sm">
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="font-inter text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Official Certificate Feature Showcase */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border border-primary/25 shadow-soft">
            {/* Certificate Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-border/60">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-inter font-semibold uppercase tracking-wider text-muted-foreground">
                  Verified Certifications & Honors
                </span>
              </div>
              <div className="flex items-center gap-2">
                {certificates.map((cert) => (
                  <button
                    key={cert.id}
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className={`px-4 py-2 rounded-xl text-xs font-inter font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedCert.id === cert.id
                        ? "bg-primary text-white shadow-sm"
                        : "bg-card text-muted-foreground hover:bg-muted border border-border"
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>{cert.id === "lakme" ? "Lakmé Academy" : "Miss & Mrs India -25"}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Certificate Details & Trust Credentials */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-inter font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>{selectedCert.tag}</span>
                </div>

                <div>
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-foreground leading-tight">
                    {selectedCert.title}
                  </h3>
                  <p className="font-inter text-muted-foreground text-sm mt-2 leading-relaxed">
                    {selectedCert.description}
                  </p>
                </div>

                {/* Metadata Badges */}
                <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
                  {selectedCert.meta.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-card/80 border border-border">
                      <item.icon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-inter font-semibold text-foreground">{item.label}</p>
                        <p className={`text-xs font-inter text-muted-foreground ${item.mono ? "font-mono" : ""}`}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-inter text-sm font-medium shadow-md hover:opacity-95 transition-all hover:scale-105 cursor-pointer"
                  >
                    <ZoomIn className="w-4 h-4" />
                    <span>View Full Certificate</span>
                  </button>

                  <span className="flex items-center gap-1.5 text-xs font-inter text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Official certification verified
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive Certificate Preview Card */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div
                  onClick={() => setIsModalOpen(true)}
                  className="group relative max-w-sm w-full bg-card rounded-2xl overflow-hidden border-2 border-primary/30 shadow-elegant cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-primary"
                >
                  {/* Certificate Image Thumbnail */}
                  <div className={`relative ${selectedCert.aspect} bg-muted overflow-hidden flex items-center justify-center`}>
                    <img
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Gradient Overlay & Hover Prompt */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-white text-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 shadow-lg">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-inter text-sm font-semibold tracking-wide">
                        Click to Zoom & View
                      </span>
                      <span className="font-inter text-xs text-white/80 mt-1">
                        High-Resolution Certificate
                      </span>
                    </div>

                    {/* Top Corner Ribbon Badge */}
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-inter font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                      {selectedCert.badge}
                    </div>
                  </div>

                  {/* Caption Footer */}
                  <div className="p-3.5 bg-card border-t border-border flex items-center justify-between">
                    <div>
                      <p className="font-playfair text-sm font-bold text-foreground">
                        Shalini
                      </p>
                      <p className="font-inter text-[11px] text-muted-foreground truncate max-w-[180px]">
                        {selectedCert.subtitle}
                      </p>
                    </div>
                    <span className="text-primary text-xs font-inter font-medium group-hover:underline flex items-center gap-1">
                      Inspect <ZoomIn className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Quick Toggle Preview Badges */}
                <div className="flex gap-2 justify-center mt-3">
                  {certificates.map((cert) => (
                    <button
                      key={cert.id}
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-inter font-medium border transition-all cursor-pointer ${
                        selectedCert.id === cert.id
                          ? "border-primary text-primary bg-primary/10 font-semibold"
                          : "border-border text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {cert.badge}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for High-Resolution Certificate View */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-card text-foreground rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-border flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-playfair text-base md:text-lg font-bold text-foreground">
                    {selectedCert.title}
                  </h3>
                  <p className="font-inter text-xs text-muted-foreground">
                    Awarded to Shalini • {selectedCert.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Switcher in Modal */}
                <div className="hidden sm:flex items-center gap-1.5 p-1 bg-muted rounded-xl">
                  {certificates.map((cert) => (
                    <button
                      key={cert.id}
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className={`px-3 py-1 rounded-lg text-xs font-inter font-medium transition-colors cursor-pointer ${
                        selectedCert.id === cert.id
                          ? "bg-card text-foreground font-semibold shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cert.badge}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-muted hover:bg-muted/80 text-foreground flex items-center justify-center transition-colors cursor-pointer ml-2"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Body */}
            <div className="overflow-y-auto p-4 md:p-6 flex items-center justify-center bg-zinc-900/60">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="max-h-[72vh] w-auto rounded-lg shadow-xl object-contain border border-border/40"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-border bg-card flex flex-wrap items-center justify-between gap-3 text-xs font-inter text-muted-foreground">
              <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                <CheckCircle2 className="w-4 h-4" /> {selectedCert.subtitle}
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition-opacity cursor-pointer ml-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
