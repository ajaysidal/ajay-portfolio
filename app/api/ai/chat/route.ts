import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // 1. SOC 2 Compliance: Verify user is authenticated
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { messages, model } = await req.json();

    // 2. Forward request to internal Ollama container via Docker network
    const ollamaUrl = process.env.OLLAMA_URL || "http://ollama:11434";
    const selectedModel = model || "llama3.1:8b";
    
    const response = await fetch(`${ollamaUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: messages,
        stream: false, // Deterministic JSON response
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();

    // 3. Return the AI response
    return NextResponse.json({ 
      success: true, 
      response: data.message.content 
    });

  } catch (error) {
    console.error("[AI PROXY ERROR]", error);
    return NextResponse.json(
      { error: "Failed to process AI request" },
      { status: 500 }
    );
  }
}
