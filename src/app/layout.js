import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { PortfolioProvider } from "@/context/PortfolioContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shalinisingh.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shalini Singh | Lakmé Certified Makeup Artist & Beauty Studio Lucknow",
    template: "%s | Shalini Singh",
  },
  description:
    "Lakmé Certified Professional Makeup Artist & Beauty Studio in Lucknow. Specializing in Bridal HD makeup, festive makeovers, rejuvenating facials, deep skin cleanup, waxing, luxury manicure, and precision eyebrow styling.",
  keywords: [
    "Makeup Artist Lucknow",
    "Bridal Makeup Artist in Lucknow",
    "Lakmé Certified Makeup Artist",
    "Shalini Singh Makeup",
    "Best Bridal Makeup Lucknow",
    "Party Makeup Artist Lucknow",
    "Haldi Makeup Lucknow",
    "Facial and Cleanup Services Lucknow",
    "Beauty Salon Lucknow",
    "Luxury Manicure Lucknow",
    "Waxing Services Lucknow",
    "Eyebrow Threading Shaping Lucknow",
    "HD Bridal Makeover"
  ],
  authors: [{ name: "Shalini Singh", url: "https://www.instagram.com/makeupbyshalini21/" }],
  creator: "Shalini Singh",
  publisher: "Shalini Singh",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Shalini Singh | Lakmé Certified Makeup Artist & Beauty Studio Lucknow",
    description:
      "Lakmé Certified Professional Makeup Artist in Lucknow. Transforming brides, festive looks, and offering premium salon & skincare services.",
    url: siteUrl,
    siteName: "Shalini Singh Makeup Artist & Beauty Studio",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/assets/hero-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Shalini Singh Lakmé Certified Professional Makeup Artist Lucknow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shalini Singh | Lakmé Certified Makeup Artist & Beauty Studio Lucknow",
    description:
      "Lakmé Certified Professional Makeup Artist in Lucknow. Bridal, party makeup & salon treatments.",
    images: ["/assets/hero-banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["BeautySalon", "ProfessionalService"],
      "@id": `${siteUrl}/#salon`,
      name: "Shalini Singh Makeup & Beauty Studio",
      url: siteUrl,
      telephone: "+916388511388",
      priceRange: "₹₹",
      image: `${siteUrl}/assets/hero-banner.jpg`,
      description:
        "Lakmé Certified Professional Makeup Artist & Beauty Studio in Lucknow offering bridal HD makeup, party makeovers, facials, skin cleanups, waxing, manicure, and brow styling.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lucknow",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "26.8467",
        longitude: "80.9462",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "09:00",
          closes: "20:00",
        },
      ],
      sameAs: ["https://www.instagram.com/makeupbyshalini21/"],
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Shalini Singh",
      jobTitle: "Lakmé Certified Professional Makeup Artist",
      telephone: "+916388511388",
      sameAs: ["https://www.instagram.com/makeupbyshalini21/"],
      worksFor: {
        "@id": `${siteUrl}/#salon`,
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  );
}
