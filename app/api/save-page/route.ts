import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { slug, data } = await req.json();
    
      return NextResponse.json({ error: 'Missing slug or data' }, { status: 400 });
    }

    const safeSlug = slug.replace(/[^a-z0-9-]/gi, '') || 'home';
    const filePath = path.join(process.cwd(), 'content', 'pages', `${safeSlug}.json`);

    const dir = path.dirname(filePath);
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return NextResponse.json({ success: true, path: filePath });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json({ error: 'Failed to save page' }, { status: 500 });
  }
}
