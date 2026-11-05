import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "../components/LayoutWrapper";

const heading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ajay Sidal — Technology & Operations Leader | Creative Technologist",
  description: "12+ years of cross-industry experience across banking, healthcare, logistics, and automotive. Expert in web development, system infrastructure, and orchestrating full-scale operations and marketing automation through AI-driven workflows.",
  keywords: [
    "Ajay Sidal",
    "Technology Leader",
    "Operations",
    "AI Workflows",
    "Web Infrastructure",
    "Creative Technologist",
    "Build With AI",
    "Sovereign AI",
    "Nginx",
    "Certbot",
    "DNS",
    "DevOps",
    "Consultancy",
  ],
  authors: [{ name: "Ajay Sidal" }],
  creator: "Ajay Sidal",
  openGraph: {
    title: "Ajay Sidal — Technology & Operations Leader | Creative Technologist",
    description: "12+ years of cross-industry experience across banking, healthcare, logistics, and automotive.",
    url: "https://buildwithai.digital",
    siteName: "Ajay Sidal Portfolio",
    images: [
      {
        url: "https://buildwithai.digital/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ajay Sidal - Creative Technologist",
      },
    ],
    locale: "en_NZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay Sidal — Technology & Operations Leader | Creative Technologist",
    description: "12+ years of cross-industry experience across banking, healthcare, logistics, and automotive.",
    images: ["https://buildwithai.digital/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Build With AI",
  "legalName": "Ajay Sidal",
  "alternateName": "BWAI",
  "url": "https://buildwithai.digital",
  "logo": "https://buildwithai.digital/og-image.png",
  "image": "https://buildwithai.digital/og-image.png",
  "description": "Technology & Operations Leader | Creative Technologist specializing in AI workflow automation, web infrastructure, and sovereign digital systems.",
  "email": "ajay@buildwithai.digital",
  "telephone": "+64223260583",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Auckland 1021",
    "addressLocality": "Auckland",
    "addressRegion": "Auckland",
    "postalCode": "1021",
    "addressCountry": "NZ",
  },
  "sameAs": [
    "https://www.linkedin.com/in/ajay-sidal/",
    "https://github.com/ajaysidal",
  ],
  "foundingDate": "2025",
  "founder": {
    "@type": "Person",
    "name": "Ajay Sidal",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ajay Sidal",
  "jobTitle": "Technology & Operations Leader | Creative Technologist",
  "worksFor": {
    "@type": "Organization",
    "name": "Build With AI",
  },
  "email": "ajay@buildwithai.digital",
  "telephone": "+64223260583",
  "url": "https://buildwithai.digital",
  "sameAs": [
    "https://www.linkedin.com/in/ajay-sidal/",
    "https://github.com/ajaysidal",
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Auckland",
    "addressRegion": "Auckland",
    "addressCountry": "NZ",
  },
  "knowsAbout": [
    "AI Workflow Automation",
    "Web Infrastructure",
    "Nginx",
    "Certbot",
    "DNS",
    "DevOps",
    "SOC2 Compliance",
    "Living Documentation",
    "Technical Storytelling",
    "Sovereign AI",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "Website",
  "name": "Build With AI",
  "url": "https://buildwithai.digital",
  "description": "Technology & Operations Leader | Creative Technologist specializing in AI workflow automation, web infrastructure, and sovereign digital systems.",
  "publisher": {
    "@type": "Organization",
    "name": "Build With AI",
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://buildwithai.digital/search?q={search_term}",
    "query-input": "required name=search_term",
  },
};

const serviceJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Workflow Automation",
    "description": "Orchestrating full-scale operations and marketing automation through deterministic AI-driven workflows.",
    "provider": {
      "@type": "Organization",
      "name": "Build With AI",
    },
    "areaServed": "NZ",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Auckland",
          "addressCountry": "NZ",
        },
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Web Infrastructure & DevOps",
    "description": "High-performance web infrastructure with Nginx, Certbot, and DNS optimization. Self-hosted, sovereign, and SOC2-compliant architecture.",
    "provider": {
      "@type": "Organization",
      "name": "Build With AI",
    },
    "areaServed": "NZ",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Auckland",
          "addressCountry": "NZ",
        },
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Living Documentation",
    "description": "Collaborating with AI agents for living documentation and technical storytelling.",
    "provider": {
      "@type": "Organization",
      "name": "Build With AI",
    },
    "areaServed": "NZ",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Auckland",
          "addressCountry": "NZ",
        },
      },
    },
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {serviceJsonLd.map((service, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
          />
        ))}
      </head>
      <body className="font-body bg-bg-primary text-text-primary antialiased overflow-x-hidden">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
