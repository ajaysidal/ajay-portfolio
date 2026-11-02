import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const slug = searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    const safeSlug = slug.replace(/[^a-z0-9-]/gi, '');
    const filePath = path.join(process.cwd(), 'content', 'pages', `${safeSlug}.json`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Load error:', error);
    return NextResponse.json({ error: 'Failed to load page' }, { status: 500 });
  }
}
