import type { Config } from "@puckeditor/core";
import { Hero } from "@/components/blocks/Hero";
import { Features } from "@/components/blocks/Features";
import { Content } from "@/components/blocks/Content";

export type Props = {
  Hero: {
    tagline: string;
    headline: string;
    text: string;
    ctaText?: string;
    ctaLink?: string;
  };
  Features: {
    items: { title: string; text: string; icon?: string }[];
    columns?: number;
  };
  Content: {
    body: string;
    title?: string;
  };
};

export const puckConfig: Config<Props> = {
  root: {
    fields: {
      title: { type: "text", label: "Page Title" },
      description: { type: "textarea", label: "Meta Description" },
      ogImage: { type: "text", label: "OG Image URL" },
    },
  },
  categories: {
    Layout: {
      components: ["Hero", "Content"],
    },
    Content: {
      components: ["Features"],
    },
  },
  components: {
    Hero: {
      fields: {
        tagline: { type: "text", label: "Tagline" },
        headline: { type: "text", label: "Headline" },
        text: { type: "textarea", label: "Supporting Text" },
        ctaText: { type: "text", label: "CTA Button Text" },
        ctaLink: { type: "text", label: "CTA Link URL" },
      },
      defaultProps: {
        tagline: "Welcome to Silas Studio",
        headline: "Build the Future",
        text: "Describe your vision here.",
        ctaText: "Get Started",
        ctaLink: "/contact",
      },
      render: (props) => <Hero data={props} />,
    },
    Features: {
      fields: {
        items: {
          type: "array",
          arrayFields: {
            title: { type: "text", label: "Feature Title" },
            text: { type: "textarea", label: "Feature Description" },
            icon: { type: "text", label: "Icon Name (bot, server, file, zap, shield, globe)" },
          },
          label: "Feature Items",
        },
        columns: { type: "number", label: "Number of Columns", min: 1, max: 4 },
      },
      defaultProps: {
        items: [{ title: "Sovereign AI", text: "Local, secure, and deterministic workflows.", icon: "bot" }],
        columns: 3,
      },
      render: (props) => <Features data={props} />,
    },
    Content: {
      fields: {
        title: { type: "text", label: "Section Title" },
        body: { type: "textarea", label: "Body Content" },
      },
      defaultProps: {
        title: "About This Section",
        body: "Add your main content here.",
      },
      render: (props) => <Content data={props} />,
    },
  },
};
