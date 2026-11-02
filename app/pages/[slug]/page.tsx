import { notFound } from 'next/navigation';
import { Render } from '@puckeditor/core';
import { puckConfig, type Props } from '@/lib/puck-config';
import fs from 'fs';
import path from 'path';

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'content', 'pages', `${params.slug}.json`);
  
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
  
  const files = fs.readdirSync(pagesDir).filter((f: string) => f.endsWith('.json'));
  return files.map((file: string) => ({
    slug: file.replace('.json', ''),
  }));
}
