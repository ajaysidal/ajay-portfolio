import { Render } from "@puckeditor/core";
import { puckConfig, type PuckData } from "@/lib/puck-config";
import fs from "fs";
import path from "path";

// Validation helper to ensure data structure is valid for Puck
function isValidPuckData(data: unknown): data is PuckData {
  if (!data || typeof data !== "object") return false;
  const d = data as Partial<PuckData>;
  if (!d.root || typeof d.root !== "object") return false;
  if (!d.root.props || typeof d.root.props !== "object") return false;
  if (!d.content || !Array.isArray(d.content)) return false;
  if (!d.zones || typeof d.zones !== "object") return false;
  return true;
}

export default function ServicesPage() {
  const filePath = path.join(process.cwd(), "content", "pages", "services.json");
  let data: PuckData = { root: { props: {} }, content: [], zones: {} };

  if (fs.existsSync(filePath)) {
    try {
      const rawData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      if (isValidPuckData(rawData)) {
        data = rawData;
      } else {
        console.warn("Invalid Puck data in services.json, using empty structure");
      }
    } catch (error) {
      console.error("Error loading services.json:", error);
    }
  }

  return <Render config={puckConfig} data={data} />;
}
