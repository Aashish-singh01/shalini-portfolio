"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Calendar,
  Lock,
  Sparkles,
  ShieldAlert,
  X,
  MessageCircle,
  ShieldCheck
} from "lucide-react";

const InstagramIcon = ({ className = "w-6 h-6 text-white" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "Bridal",
    eventDate: "",
    eventLocation: "",
    message: ""
  });
  const [minDate, setMinDate] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      serviceType: formData.serviceType,
      eventDate: formData.eventDate,
      eventLocation: formData.eventLocation.trim(),
      message: formData.message.trim()
    };

    // 1. Record inquiry securely on server
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn("Server save error:", err);
    }

    // 2. Prepare message for Shalini's WhatsApp
    const lines = [
      `*New Booking Enquiry - Shalini Singh Portfolio*`,
      ``,
      `*Client Name:* ${payload.name}`,
      `*Client Phone:* ${payload.phone}`,
      payload.email ? `*Email:* ${payload.email}` : null,
      `*Service Required:* ${payload.serviceType}`,
      payload.eventDate ? `*Event Date:* ${payload.eventDate}` : null,
      payload.eventLocation ? `*Event Location/Venue:* ${payload.eventLocation}` : null,
      payload.message ? `*Notes/Message:* ${payload.message}` : null
    ].filter(Boolean);

    const messageText = encodeURIComponent(lines.join("\n"));
    const shaliniNumber = "916388511388";
    const shaliniUrl = `https://wa.me/${shaliniNumber}?text=${messageText}`;

    // Open Shalini WhatsApp
    window.open(shaliniUrl, "_blank");

    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4500);

    setFormData({
      name: "",
      phone: "",
      email: "",
      serviceType: "Bridal",
      eventDate: "",
      eventLocation: "",
      message: ""
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone / WhatsApp",
      value: "+91 63885 1XXXX",
      link: "tel:+916388511388"
    },
    {
      icon: Mail,
      label: "Email",
      value: "shalinisingh63885@gmail.com",
      link: "mailto:shalinisingh63885@gmail.com"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Lakmé Academy Powered By Aptech, Lucknow",
      link: "https://www.google.com/maps/search/Lakmé+Academy+Powered+By+Aptech"
    },
    {
      icon: InstagramIcon,
      label: "Instagram",
      value: "@makeupbyshalini21",
      link: "https://www.instagram.com/makeupbyshalini21/"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-inter font-semibold tracking-wider uppercase text-xs">
            Get In Touch
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Book an Appointment
          </h2>
          <p className="font-inter text-lg text-muted-foreground text-center">
            Ready to enhance your beauty? Share your event details below to check availability and reserve your slot.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-playfair text-2xl font-semibold text-foreground mb-6">
              Studio & Contact Info
            </h3>
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-start space-x-4 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-inter font-medium text-foreground text-sm">{item.label}</p>
                  <a
                    href={item.link}
                    target={item.label === "Phone / WhatsApp" || item.label === "Email" ? undefined : "_blank"}
                    rel={item.label === "Phone / WhatsApp" || item.label === "Email" ? undefined : "noopener noreferrer"}
                    className="font-inter text-muted-foreground hover:text-primary transition-colors text-base"
                  >
                    {item.value}
                  </a>
                </div>
              </div>
            ))}

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent border border-primary/20 mt-8">
              <h4 className="font-playfair font-semibold text-lg text-foreground mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Special Bridal Consultation
              </h4>
              <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                Pre-bridal skin preparation, trial sessions, and customized family makeover packages available on prior booking.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-card p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-border shadow-soft">
            <h3 className="font-playfair text-xl font-bold text-foreground mb-1">
              Enquiry & Booking Form
            </h3>
            <p className="font-inter text-xs text-muted-foreground mb-6">
              Fill in your event details and send directly to Shalini on WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name & Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-inter font-semibold text-foreground mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Priya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-inter text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-inter font-semibold text-foreground mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-inter text-sm"
                  />
                </div>
              </div>

              {/* Row 2: Service Type & Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-inter font-semibold text-foreground mb-1.5">
                    Service Type *
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-inter text-sm cursor-pointer"
                  >
                    <option value="Bridal">Bridal Makeup</option>
                    <option value="Party">Party Makeup</option>
                    <option value="Engagement">Engagement Makeup</option>
                    <option value="Facial">Facial & Skincare</option>
                    <option value="Other">Other (Cleanup, Waxing, Nails, etc.)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-inter font-semibold text-foreground mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. priya@example.com (optional)"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-inter text-sm"
                  />
                </div>
              </div>

              {/* Row 3: Event Date & Event Location */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-inter font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    Event Date
                  </label>
                  <input
                    type="date"
                    min={minDate}
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-inter text-sm cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-inter font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    Event Location / Venue
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lucknow, Gomti Nagar"
                    value={formData.eventLocation}
                    onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-inter text-sm"
                  />
                </div>
              </div>

              {/* Row 4: Notes/Message */}
              <div>
                <label className="block text-xs font-inter font-semibold text-foreground mb-1.5">
                  Additional Notes or Questions
                </label>
                <textarea
                  placeholder="Tell us about your preferences, number of guests, or special requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-inter text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-95 text-white font-inter font-medium py-3.5 rounded-xl shadow-elegant transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-sm flex items-center justify-center gap-2"
              >
                <span>Send Booking Enquiry via WhatsApp</span>
              </button>

              {/* High-Visibility Strict Notice Alert */}
              <div className="mt-4 p-4 rounded-xl border-2 border-red-500/60 bg-red-50 dark:bg-red-950/60 dark:border-red-500 flex items-start gap-3 text-left shadow-sm">
                <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm font-inter leading-relaxed">
                  <strong className="font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mr-1.5 inline">
                    Important Notice:
                  </strong>
                  <span className="font-semibold text-red-900 dark:text-red-100 inline">
                    Please use this form strictly for genuine booking & service enquiries. Any fraudulent submissions, spam, or misuse will be subject to strict legal action.
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Floating Notification Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-foreground text-background px-5 py-4 rounded-2xl shadow-2xl border border-border/20 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div className="text-sm font-inter">
            <p className="font-semibold">Enquiry Submitted!</p>
            <p className="text-xs text-background/80">WhatsApp is opening to confirm your appointment.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
