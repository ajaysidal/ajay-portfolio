import React from "react";
import type { Config, Data } from "@puckeditor/core";

export type HeroProps = {
  title?: string;
  description?: string;
  variant?: "default" | "primary";
  // Sovereign block component props (used by services.json)
  tagline?: string;
  headline?: string;
  text?: string;
  ctaText?: string;
  ctaLink?: string;
};

export type TextBlockProps = {
  children?: string;
};

export type ImageBlockProps = {
  imageUrl?: string;
  description?: string;
};

export type FeatureItem = {
  title: string;
  text: string;
  icon?: string;
};

export type FeaturesProps = {
  items: FeatureItem[];
  columns?: number;
};

export type ContentProps = {
  body: string;
};

export type ComponentMap = {
  Hero: HeroProps;
  TextBlock: TextBlockProps;
  ImageBlock: ImageBlockProps;
  Features: FeaturesProps;
  Content: ContentProps;
};

export type Props = HeroProps | TextBlockProps | ImageBlockProps | FeaturesProps | ContentProps;

export type RootProps = {
  title?: string;
  metaDescription?: string;
};

export const puckConfig: Config<ComponentMap, RootProps> = {
  root: {
    defaultProps: {
      title: "Sovereign Command Center",
      metaDescription: "Enterprise-grade digital infrastructure.",
    },
    fields: {
      title: { type: "text", label: "Page Title" },
      metaDescription: { type: "textarea", label: "SEO Meta Description" },
    },
  },
  categories: {
    layout: { title: "Layout Components", components: ["Hero"] },
    content: { title: "Content Components", components: ["TextBlock", "Features", "Content"] },
    media: { title: "Media Components", components: ["ImageBlock"] },
  },
  components: {
    Hero: {
      defaultProps: {
        title: "Sovereign Command Center",
        description: "Build, deploy, and manage your digital infrastructure with precision.",
        variant: "primary",
        tagline: "",
        headline: "",
        text: "",
        ctaText: "",
        ctaLink: "",
      },
      fields: {
        title: { type: "text", label: "Headline" },
        description: { type: "textarea", label: "Subheadline" },
        variant: { type: "radio", label: "Style", options: [{ label: "Default", value: "default" }, { label: "Primary (Gold)", value: "primary" }] },
        tagline: { type: "text", label: "Tagline" },
        headline: { type: "text", label: "Headline" },
        text: { type: "textarea", label: "Body Text" },
        ctaText: { type: "text", label: "CTA Text" },
        ctaLink: { type: "text", label: "CTA Link" },
      },
      render: ({ title, description, variant, tagline, headline, text, ctaText, ctaLink }: HeroProps) => {
        // Sovereign block-style rendering when tagline/headline/text are present
        if (tagline || headline || text) {
          return (
            <section className="py-24 px-6 text-center bg-[#0B0C10]">
              <div className="max-w-4xl mx-auto">
                {tagline && <span className="mono block mb-4 text-[#D4AF37]">{tagline}</span>}
                <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold tracking-tight mb-6 text-[#F8F9FA]">
                  {headline || title || "Sovereign Command Center"}
                </h1>
                {text && <p className="text-[#aab3bd] text-lg max-w-2xl mx-auto mb-8">{text}</p>}
                {!text && description && <p className="text-lg text-[#aab3bd] max-w-2xl mx-auto">{description}</p>}
                {ctaText && ctaLink && (
                  <a href={ctaLink} className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#0B0C10] rounded-lg font-bold hover:bg-[#b8962e] transition-all">
                    {ctaText} <span className="w-5 h-5">{">"}</span>
                  </a>
                )}
              </div>
            </section>
          );
        }
        // Original Puck Hero rendering
        return (
          <section className={`p-8 md:p-16 text-center ${variant === "primary" ? "bg-[#D4AF37]/10 border-b border-[#D4AF37]/20" : "bg-[#0B0C10]"}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-[#F8F9FA] mb-4">{title}</h1>
            <p className="text-lg text-[#aab3bd] max-w-2xl mx-auto">{description}</p>
          </section>
        );
      },
    },
    TextBlock: {
      defaultProps: { children: "Your sovereign content goes here. Edit this text directly." },
      fields: {
        children: { type: "textarea", label: "Content" },
      },
      render: ({ children }: TextBlockProps) => (
        <div className="p-8 md:p-16 max-w-4xl mx-auto text-[#aab3bd] leading-relaxed whitespace-pre-wrap">{children}</div>
      ),
    },
    ImageBlock: {
      defaultProps: { imageUrl: "https://via.placeholder.com/800x400/1F2833/D4AF37?text=Sovereign+Media", description: "Image description" },
      fields: {
        imageUrl: { type: "text", label: "Image URL" },
        description: { type: "text", label: "Alt Text" },
      },
      render: ({ imageUrl, description }: ImageBlockProps) => (
        <div className="p-8 md:p-16">
          <img src={imageUrl} alt={description} className="w-full rounded-lg border border-[#D4AF37]/20 shadow-2xl" />
          {description && <p className="text-center text-sm text-[#aab3bd] mt-4">{description}</p>}
        </div>
      ),
    },
    Features: {
      defaultProps: {
        items: [
          { title: "AI Workflow Automation", text: "Orchestrating full-scale operations through deterministic AI-driven workflows.", icon: "bot" },
          { title: "Web Infrastructure", text: "High-performance web infrastructure with Nginx, Certbot, and DNS optimization.", icon: "server" },
          { title: "Living Documentation", text: "Collaborating with AI agents for living documentation and technical storytelling.", icon: "file" },
        ],
        columns: 3,
      },
      fields: {
        items: {
          type: "array",
          label: "Feature Items",
          arrayFields: {
            title: { type: "text", label: "Feature Title" },
            text: { type: "textarea", label: "Feature Description" },
            icon: { type: "text", label: "Icon Name" },
          },
        },
        columns: { type: "number", label: "Columns" },
      },
      render: ({ items, columns }: FeaturesProps) => {
        const iconMap: Record<string, React.ReactNode> = {
          bot: <span className="w-6 h-6">🤖</span>,
          server: <span className="w-6 h-6">🖥️</span>,
          file: <span className="w-6 h-6">📄</span>,
          zap: <span className="w-6 h-6">⚡</span>,
          shield: <span className="w-6 h-6">🛡️</span>,
          globe: <span className="w-6 h-6">🌐</span>,
        };
        const getIcon = (iconName?: string) => iconMap[iconName || "file"] || iconMap["file"];
        const colCount = columns || 3;
        const gridClass = colCount === 2 ? "md:grid-cols-2" : colCount === 4 ? "md:grid-cols-4" : "md:grid-cols-3";

        return (
          <section className="py-16 px-6">
            <div className={`max-w-7xl mx-auto grid grid-cols-1 ${gridClass} gap-8`}>
              {items.map((item, i) => (
                <div key={i} className="glass-tilt p-8 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center mb-4">
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#F8F9FA]">{item.title}</h3>
                  <p className="text-[#aab3bd] text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </section>
        );
      },
    },
    Content: {
      defaultProps: { body: "" },
      fields: {
        body: { type: "textarea", label: "Body Content" },
      },
      render: ({ body }: ContentProps) => (
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto prose prose-invert max-w-none">
            <p className="text-[#aab3bd] whitespace-pre-wrap">{body}</p>
          </div>
        </section>
      ),
    },
  },
};

export type PuckData = Data<ComponentMap, RootProps>;
