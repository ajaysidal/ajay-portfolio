import { notFound } from 'next/navigation';
import { Render } from '@puckeditor/core';
import { puckConfig, type PuckData } from '@/lib/puck-config';
import fs from 'fs';
import path from 'path';

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

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params object in Next.js 15
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'content', 'pages', `${slug}.json`);
  
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  let data: PuckData = { root: { props: {} }, content: [], zones: {} };

  try {
    const parsed = JSON.parse(fileContent);
    if (isValidPuckData(parsed)) {
      data = parsed;
    } else {
      console.warn(`Invalid Puck data in ${slug}.json, using empty structure`);
    }
  } catch (error) {
    console.error(`Error loading ${slug}.json:`, error);
  }

  return (
    <main className="min-h-screen bg-[#0B0C10] text-[#F8F9FA]">
      <Render config={puckConfig} data={data} />
    </main>
  );
}

export async function generateStaticParams() {
  const pagesDir = path.join(process.cwd(), 'content', 'pages');
  if (!fs.existsSync(pagesDir)) return [];
  
  const files = fs.readdirSync(pagesDir).filter((f: string) => f.endsWith('.json'));
  return files.map((file: string) => ({
    slug: file.replace('.json', ''),
  }));
}
