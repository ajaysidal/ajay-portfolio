// .tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "main",
  // Your default Git branch
  clientId: process.env.TINA_CLIENT_ID || "local",
  token: process.env.TINA_TOKEN || "local",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "services",
        label: "Services",
        path: "content/services",
        format: "mdx",
        ui: {
          filename: {
            slugify: (values) => values?.title ? values.title.toLowerCase().replace(/ /g, "-") : ""
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Service Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true
          },
          {
            type: "rich-text",
            name: "description",
            label: "Service Description"
          },
          {
            type: "string",
            name: "status",
            label: "Status",
            options: ["draft", "published"],
            default: "published"
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
