import { Render } from "@puckeditor/core";
import { puckConfig, type PuckData } from "@/lib/puck-config";
import fs from "fs";
import path from "path";

export default function ServicesPage() {
  const filePath = path.join(process.cwd(), "content", "pages", "services.json");
  let data: PuckData = { root: { props: {} }, content: [] };

  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  return <Render config={puckConfig} data={data} />;
}
