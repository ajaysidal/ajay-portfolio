import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get("slug") || "home";
    const filePath = path.join(process.cwd(), "content", "pages", `${slug}.json`);
    
    if (fs.existsSync(filePath)) {
      const rawData = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(rawData);
      // Ensure data has zones field required by Puck
      if (!data.zones) {
        data.zones = {};
      }
      if (!data.root) {
        data.root = { props: {} };
      }
      if (!data.content) {
        data.content = [];
      }
      return NextResponse.json(data);
    }
    
    // Return complete Puck data structure with zones
    return NextResponse.json({ root: { props: {} }, content: [], zones: {} });
  } catch (error) {
    console.error("Puck Load Error:", error);
    // Always return valid Puck data structure with zones
    return NextResponse.json({ root: { props: {} }, content: [], zones: {} });
  }
}
