import type { Config, Data } from "@puckeditor/core";

export type HeroProps = {
  title?: string;
  description?: string;
  variant?: "default" | "primary";
};

export type TextBlockProps = {
  children?: string;
};

export type ImageBlockProps = {
  imageUrl?: string;
  description?: string;
};

export type ComponentMap = {
  Hero: HeroProps;
  TextBlock: TextBlockProps;
  ImageBlock: ImageBlockProps;
};

export type Props = HeroProps | TextBlockProps | ImageBlockProps;

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
    content: { title: "Content Components", components: ["TextBlock"] },
    media: { title: "Media Components", components: ["ImageBlock"] },
  },
  components: {
    Hero: {
      defaultProps: {
        title: "Sovereign Command Center",
        description: "Build, deploy, and manage your digital infrastructure with precision.",
        variant: "primary"
      },
      fields: {
        title: { type: "text", label: "Headline" },
        description: { type: "textarea", label: "Subheadline" },
        variant: { type: "radio", label: "Style", options: [{ label: "Default", value: "default" }, { label: "Primary (Gold)", value: "primary" }] },
      },
      render: ({ title, description, variant }: HeroProps) => (
        <section className={`p-8 md:p-16 text-center ${variant === "primary" ? "bg-[#D4AF37]/10 border-b border-[#D4AF37]/20" : "bg-[#0B0C10]"}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-[#F8F9FA] mb-4">{title}</h1>
          <p className="text-lg text-[#aab3bd] max-w-2xl mx-auto">{description}</p>
        </section>
      ),
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
  },
};

export type PuckData = Data<ComponentMap, RootProps>;
