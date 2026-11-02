import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  // Fallback to real credentials to guarantee cloud build even if env vars are missed
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "fef64af4-eaf2-4e6f-bd87-1f368c2b9dab",
  token: process.env.TINA_TOKEN || "ec395e26b7df37429193c34e59e66830e4074d6e",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "services",
        label: "Services",
        path: "content/services",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Service Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
          },
          {
            type: "rich-text",
            name: "description",
            label: "Service Description",
          },
          {
            type: "string",
            name: "status",
            label: "Status",
            options: ["draft", "published"],
          },
        ],
      },
    ],
  },
});
// Force TinaCloud re-index Mon Nov  2 02:06:43 CET 2026
