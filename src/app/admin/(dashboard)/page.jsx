"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  Sparkles,
  Upload,
  Trash2,
  ExternalLink,
  ArrowLeft,
  Lock,
  Unlock,
  CheckCircle2,
  Image as ImageIcon,
  RotateCcw,
  AlertCircle,
  Phone,
  Mail,
  Calendar,
  MapPin,
  MessageCircle,
  ShieldCheck,
  RefreshCw,
  Inbox,
  UserCheck,
  Copy
} from "lucide-react";

const Admin = () => {
  const { works, addWork, deleteWork, resetWorks } = usePortfolio();

  // PIN security (PIN: 2026)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClientMounted, setIsClientMounted] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  // Tab state
  const [activeTab, setActiveTab] = useState("works"); // "works" | "inquiries"

  // Inquiries state
  const [inquiries, setInquiries] = useState([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Bridal");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadType, setUploadType] = useState("file"); // "file" or "url"

  // Notifications
  const [toastMessage, setToastMessage] = useState("");

  const fetchInquiries = async () => {
    setIsLoadingInquiries(true);
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries || []);
      }
    } catch (e) {
      console.error("Error loading inquiries:", e);
    } finally {
      setIsLoadingInquiries(false);
    }
  };

  useEffect(() => {
    setIsClientMounted(true);
    if (sessionStorage.getItem("shalini_admin_auth") === "true") {
      setIsAuthenticated(true);
      fetchInquiries();
    }
  }, []);

  const handleDeleteInquiry = async (id, name) => {
    if (!window.confirm(`Delete enquiry from "${name}"?`)) return;
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
        showNotification(`Enquiry from "${name}" deleted.`);
      }
    } catch (e) {
      console.error(e);
      showNotification("Failed to delete enquiry.");
    }
  };

  const handleCopyInquiry = (inq) => {
    const text = `📋 Client Inquiry Details:\nName: ${inq.name}\nPhone: ${inq.phone}\nService: ${inq.serviceType}\nDate: ${inq.eventDate || "N/A"}\nVenue: ${inq.eventLocation || "N/A"}\nNotes: ${inq.message || "None"}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showNotification("Inquiry details copied to clipboard!");
    }
  };

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  // Verify PIN
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === "2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("shalini_admin_auth", "true");
      setPinError("");
    } else {
      setPinError("Incorrect PIN! Please try again.");
    }
  };

  // Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("shalini_admin_auth");
    setPinInput("");
  };

  // File to base64
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Please choose an image under 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit work
  const handleSubmit = (e) => {
    e.preventDefault();

    const finalImage = uploadType === "file" ? imagePreview : imageUrl.trim();

    if (!title.trim()) {
      alert("Please enter a title for the work.");
      return;
    }

    if (!finalImage) {
      alert("Please upload a photo or provide an image URL.");
      return;
    }

    addWork({
      title,
      category,
      description,
      image: finalImage,
      link
    });

    showNotification(`"${title}" has been added to portfolio successfully! 🎉`);

    // Reset form
    setTitle("");
    setDescription("");
    setLink("");
    setImagePreview("");
    setImageUrl("");
  };

  if (!isClientMounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // PIN lock screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/20 flex items-center justify-center p-4">
        <div className="bg-card w-full max-w-md p-8 rounded-3xl border border-border shadow-elegant text-center animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md">
            <Lock className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-widest font-inter font-semibold text-primary">
            Admin Area
          </span>
          <h1 className="font-playfair text-3xl font-bold mt-1 mb-2 text-foreground">
            Shalini Singh 
          </h1>
          <p className="font-inter text-sm text-muted-foreground mb-6">
            Enter your 4-digit PIN to upload and manage portfolio looks.
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={4}
                placeholder="••••"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                autoFocus
                className="w-full text-center tracking-[0.5em] text-2xl font-bold py-3.5 px-4 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {pinError && (
              <p className="text-xs font-inter text-destructive flex items-center justify-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> {pinError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-95 text-white py-3.5 rounded-xl font-inter font-medium shadow-md transition-all cursor-pointer"
            >
              Unlock Admin
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border flex items-center justify-center text-xs font-inter text-muted-foreground">
            <Link href="/" className="text-primary hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/10 to-background text-foreground pb-24">
      {/* Top Admin Header */}
      <header className="bg-card border-b border-border sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground transition-all flex items-center gap-1.5 text-xs font-inter font-medium"
              title="View live portfolio"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>View Live Portfolio</span>
            </Link>
            <div>
              <h1 className="font-playfair text-xl font-bold text-foreground">
                Shalini's Admin
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("works")}
              className={`px-3 py-1.5 rounded-xl text-xs font-inter font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "works"
                  ? "bg-primary text-white shadow-xs"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Works ({works.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("inquiries");
                fetchInquiries();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-inter font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "inquiries"
                  ? "bg-primary text-white shadow-xs"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Client Enquiries ({inquiries.length})</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-muted hover:bg-destructive/10 hover:text-destructive text-muted-foreground text-xs font-inter font-medium flex items-center gap-1.5 transition-colors cursor-pointer ml-1"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container mx-auto px-4 pt-8 max-w-6xl">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary/15 via-secondary/15 to-primary/5 border border-primary/20 rounded-3xl p-6 md:p-8 mb-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-primary font-inter font-semibold text-xs uppercase tracking-wider">
                Admin Dashboard & Security ✨
              </span>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold mt-1 text-foreground">
                {activeTab === "works" ? "Upload & Manage Makeup Looks" : "Client Booking Enquiries & Security Log"}
              </h2>
              <p className="font-inter text-muted-foreground text-sm mt-1 max-w-xl">
                {activeTab === "works"
                  ? "Easily add your latest bridal, party, festive, or photoshoot looks. Newly added items will instantly appear in your live portfolio."
                  : "Review all inquiries submitted through the website contact form. Verified contact details and event info are stored here for protection and safety."}
              </p>
            </div>
            <div className="flex items-center gap-3 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("works")}
                className={`bg-card px-4 py-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                  activeTab === "works" ? "border-primary ring-2 ring-primary/20" : "border-border hover:bg-muted"
                }`}
              >
                <span className="block text-xl font-bold text-primary font-playfair">
                  {works.length}
                </span>
                <span className="text-[11px] font-inter text-muted-foreground">
                  Portfolio Works
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("inquiries");
                  fetchInquiries();
                }}
                className={`bg-card px-4 py-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                  activeTab === "inquiries" ? "border-primary ring-2 ring-primary/20" : "border-border hover:bg-muted"
                }`}
              >
                <span className="block text-xl font-bold text-primary font-playfair">
                  {inquiries.length}
                </span>
                <span className="text-[11px] font-inter text-muted-foreground">
                  New Enquiries
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 2: Client Inquiries Inbox */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <h3 className="font-playfair text-xl font-bold text-foreground">
                  Live Enquiries ({inquiries.length})
                </h3>
              </div>
              <button
                onClick={fetchInquiries}
                disabled={isLoadingInquiries}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-muted text-xs font-inter font-medium text-foreground transition-all cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingInquiries ? "animate-spin" : ""}`} />
                <span>Refresh List</span>
              </button>
            </div>

            {inquiries.length === 0 ? (
              <div className="p-12 text-center bg-card rounded-3xl border border-dashed border-border">
                <Inbox className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                <h4 className="font-playfair text-lg font-bold text-foreground mb-1">
                  No Enquiries Received Yet
                </h4>
                <p className="font-inter text-xs text-muted-foreground max-w-md mx-auto">
                  When visitors or clients fill the contact form on your portfolio website, their details (name, phone, date, venue, message) will appear here instantly.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {inquiries.map((inq) => {
                  const inquiryMessage = encodeURIComponent(
                    `Hello ${inq.name}! Regarding your enquiry for "${inq.serviceType}" on Shalini Singh's portfolio:`
                  );
                  const clientWhatsapp = `https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=${inquiryMessage}`;
                  const forwardMessage = encodeURIComponent(
                    `*Forwarded Inquiry Log from Shalini Portfolio*\n*Client:* ${inq.name}\n*Phone:* ${inq.phone}\n*Service:* ${inq.serviceType}\n*Date:* ${inq.eventDate || "N/A"}\n*Venue:* ${inq.eventLocation || "N/A"}\n*Notes:* ${inq.message || "N/A"}`
                  );
                  const forwardUrl = `https://wa.me/919026218692?text=${forwardMessage}`;

                  return (
                    <div
                      key={inq.id}
                      className="bg-card p-5 md:p-6 rounded-2xl border border-border shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-primary/40 transition-colors"
                    >
                      <div className="space-y-2 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-playfair text-lg font-bold text-foreground">
                            {inq.name}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-inter font-semibold bg-primary/10 text-primary border border-primary/20">
                            {inq.serviceType}
                          </span>
                          <span className="text-[11px] font-inter text-muted-foreground">
                            {new Date(inq.createdAt).toLocaleString("en-IN", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </span>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-2 text-xs font-inter text-muted-foreground pt-1">
                          <div className="flex items-center gap-1.5 text-foreground font-medium">
                            <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            <a href={`tel:${inq.phone}`} className="hover:underline">
                              {inq.phone}
                            </a>
                          </div>

                          {inq.email && (
                            <div className="flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                              <a href={`mailto:${inq.email}`} className="hover:underline">
                                {inq.email}
                              </a>
                            </div>
                          )}

                          {inq.eventDate && (
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                              <span>Event Date: {inq.eventDate}</span>
                            </div>
                          )}

                          {inq.eventLocation && (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                              <span>Venue: {inq.eventLocation}</span>
                            </div>
                          )}
                        </div>

                        {inq.message && (
                          <div className="p-3 rounded-xl bg-muted/60 text-xs font-inter text-foreground mt-2 border border-border/50">
                            <p className="font-semibold text-[11px] text-muted-foreground mb-0.5">Client Note / Message:</p>
                            <p>{inq.message}</p>
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap md:flex-col gap-2 flex-shrink-0">
                        <a
                          href={clientWhatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-inter font-medium shadow-xs transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Client</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleCopyInquiry(inq)}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground text-xs font-inter font-medium transition-colors cursor-pointer"
                          title="Copy all details to clipboard"
                        >
                          <Copy className="w-3.5 h-3.5 text-primary" />
                          <span>Copy Details</span>
                        </button>

                        <a
                          href={forwardUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary text-xs font-inter font-medium transition-colors"
                          title="Send pre-filled message to your WhatsApp chat"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Forward to My WhatsApp</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleDeleteInquiry(inq.id, inq.name)}
                          className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl text-destructive hover:bg-destructive/10 text-xs font-inter font-medium transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 1: Portfolio Works Manager */}
        {activeTab === "works" && (

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Form to Upload Work */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card p-6 md:p-7 rounded-3xl border border-border shadow-soft">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Upload className="w-4 h-4" />
                </div>
                <h3 className="font-playfair text-xl font-bold">1. Work Details</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Work Title */}
                <div>
                  <label className="block text-xs font-inter font-semibold text-foreground mb-1.5">
                    Work Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Bridal HD Makeup, Haldi Glow"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-inter focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-inter font-semibold text-foreground mb-1.5">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-inter focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="Bridal">Bridal</option>
                    <option value="Festive">Festive (Haldi / Mehendi)</option>
                    <option value="Natural">Natural & Soft Glow</option>
                    <option value="Facials">Facials & Glow</option>
                    <option value="Skin Cleanup">Skin Cleanup & Pore Care</option>
                    <option value="Manicure">Luxury Manicure</option>
                    <option value="Waxing & Eyebrows">Waxing & Eyebrows</option>
                  </select>
                </div>

                {/* Photo Input (File or URL) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-inter font-semibold text-foreground">
                      Choose Photo *
                    </label>
                    <div className="flex gap-2 text-xs font-inter">
                      <button
                        type="button"
                        onClick={() => setUploadType("file")}
                        className={`px-2 py-0.5 rounded-md cursor-pointer ${
                          uploadType === "file"
                            ? "bg-primary text-white"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        Upload File
                      </button>
                      <button
                        type="button"
                        onClick={() => setUploadType("url")}
                        className={`px-2 py-0.5 rounded-md cursor-pointer ${
                          uploadType === "url"
                            ? "bg-primary text-white"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        Image URL
                      </button>
                    </div>
                  </div>

                  {uploadType === "file" ? (
                    <div>
                      <label className="border-2 border-dashed border-border hover:border-primary/50 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors">
                        <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
                        <span className="text-xs font-inter font-medium text-foreground">
                          Choose photo from device or gallery
                        </span>
                        <span className="text-[11px] font-inter text-muted-foreground mt-0.5">
                          JPG, PNG, WebP (Max 5MB)
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/... or image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-inter focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  )}

                  {/* Photo Preview */}
                  {(imagePreview || (uploadType === "url" && imageUrl)) && (
                    <div className="mt-3 relative rounded-xl overflow-hidden aspect-[4/3] bg-muted border border-border">
                      <img
                        src={uploadType === "file" ? imagePreview : imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop";
                        }}
                      />
                      <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-inter px-2 py-0.5 rounded-md">
                        Image Preview
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-inter font-semibold text-foreground mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Lakmé HD products, dewy finish, waterproof base lasting 14+ hours..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-input bg-background text-sm font-inter focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>

                {/* Reference Link */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-inter font-semibold text-foreground">
                      Instagram / Reference Link (Optional)
                    </label>
                    {link && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-inter text-primary hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" /> Test Link
                      </a>
                    )}
                  </div>
                  <input
                    type="url"
                    placeholder="https://www.instagram.com/p/..."
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-inter focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-95 text-white py-3.5 rounded-xl font-inter font-medium text-sm shadow-elegant transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Upload to Portfolio</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Manage Uploaded Works */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-card p-6 md:p-7 rounded-3xl border border-border shadow-soft">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-border">
                <div>
                  <h3 className="font-playfair text-xl font-bold">
                    2. Uploaded Works ({works.length})
                  </h3>
                  <p className="font-inter text-xs text-muted-foreground mt-0.5">
                    Manage all uploaded looks, preview reference links, or delete entries.
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (window.confirm("Reset portfolio back to initial sample works?")) {
                      resetWorks();
                      showNotification("Default works have been restored.");
                    }
                  }}
                  className="flex items-center gap-1 text-xs font-inter text-muted-foreground hover:text-foreground py-1 px-2.5 rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer"
                  title="Restore initial default sample works"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
                </button>
              </div>

              {/* Works List */}
              <div className="space-y-4 max-h-[680px] overflow-y-auto pr-1">
                {works.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-muted/30 hover:bg-muted/60 border border-border/80 transition-all"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      {/* Image Thumbnail */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0 border border-border">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&auto=format&fit=crop";
                          }}
                        />
                      </div>

                      {/* Info */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-inter font-semibold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {item.category}
                          </span>
                          {index === 0 && (
                            <span className="text-[10px] font-inter bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full font-medium">
                              New
                            </span>
                          )}
                        </div>
                        <h4 className="font-playfair text-base font-bold mt-1 text-foreground">
                          {item.title}
                        </h4>
                        <p className="font-inter text-xs text-muted-foreground line-clamp-1 max-w-sm mt-0.5">
                          {item.description || "No description provided."}
                        </p>
                      </div>
                    </div>

                    {/* Actions: Test Link & Delete */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-muted text-xs font-inter font-medium text-foreground transition-colors"
                          title="Test reference link"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-primary" />
                          <span>Test Link</span>
                        </a>
                      ) : (
                        <span className="text-[11px] font-inter text-muted-foreground px-2 py-1">
                          (No link)
                        </span>
                      )}

                      <button
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
                            deleteWork(item.id);
                            showNotification(`"${item.title}" has been deleted.`);
                          }
                        }}
                        className="p-2 rounded-xl text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        )}
      </main>

      {/* Floating Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-foreground text-background px-5 py-3.5 rounded-2xl shadow-2xl border border-border/20 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-sm font-inter font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Admin;
