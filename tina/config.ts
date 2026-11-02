import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
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
        // CORRECTED: Return the full live site URL for visual editing
        ui: {
          router: ({ document }) => {
            // Return the full URL to the live page
            return `https://buildwithai.digital/services`;
          },
        },
      },
    ],
  },
});
