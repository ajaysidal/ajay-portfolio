import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const pagesDir = path.join(process.cwd(), "content", "pages");
    let files: { slug: string; name: string }[] = [];

    if (fs.existsSync(pagesDir)) {
      files = fs.readdirSync(pagesDir)
        .filter((f) => f.endsWith(".json"))
        .map((file) => {
          const slug = file.replace(".json", "");
          return {
            slug,
            name: slug === "home" ? "Home Page" : slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
          };
        });
    }
    
    // Ensure "home" always exists in the list for easy access
    if (!files.find(f => f.slug === "home")) {
      files.unshift({ slug: "home", name: "Home Page" });
    }
    
    return NextResponse.json(files);
  } catch (error) {
    console.error("Puck Files Error:", error);
    // Always return valid Puck data structure, never error objects
    return NextResponse.json([]);
  }
}
