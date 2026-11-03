import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const { slug, data } = await request.json();
    
    if (!slug || slug === "new") {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }
    
    const pagesDir = path.join(process.cwd(), "content", "pages");
    if (!fs.existsSync(pagesDir)) {
      fs.mkdirSync(pagesDir, { recursive: true });
    }
    
    const filePath = path.join(pagesDir, `${slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true, message: "Page saved successfully" });
  } catch (error) {
    console.error("Puck Save Error:", error);
    return NextResponse.json({ error: "Failed to save page" }, { status: 500 });
  }
}
