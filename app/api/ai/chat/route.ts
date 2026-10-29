import { NextRequest, NextResponse } from 'next/server';

const OLLAMA_BASE = process.env.OLLAMA_API_URL || 'http://127.0.0.1:11434';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { message, model = 'phi3:mini' } = await request.json();

    const response = await fetch(`${OLLAMA_BASE}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt: message,
        stream: false,
      }),
    });

    const data = await response.json();
    return NextResponse.json({ response: data.response });
  } catch (error) {
    console.error('Ollama API Error:', error);
    return NextResponse.json(
      { error: 'AI service unavailable' },
      { status: 503 }
    );
  }
}

// Health check endpoint
export async function GET() {
  try {
    const response = await fetch(`${OLLAMA_BASE}/api/tags`, {
      cache: 'no-store',
    });
    const data = await response.json();
    return NextResponse.json({ 
      status: 'healthy',
      models: data.models?.map((m: any) => m.name) || []
    });
  } catch {
    return NextResponse.json(
      { status: 'unavailable', models: [] },
      { status: 503 }
    );
  }
}