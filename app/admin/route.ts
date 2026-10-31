import { readFileSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const adminHtmlPath = join(process.cwd(), 'public', 'admin', 'index.html');
  const html = readFileSync(adminHtmlPath, 'utf-8');
  
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}