import { notFound } from 'next/navigation';
import { Render } from '@puckeditor/core';
import { puckConfig, type Props } from '@/lib/puck-config';
import fs from 'fs';
import path from 'path';

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params object in Next.js 15
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'content', 'pages', `${slug}.json`);
  
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileContent);

  return (
    <main className="min-h-screen bg-[#0B0C10] text-[#F8F9FA]">
      <Render config={puckConfig as any} data={data} />
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
