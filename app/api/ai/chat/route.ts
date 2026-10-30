import { auth } from "@/auth";
import { NextResponse } from "next/server";

const SILAS_SYSTEM_PROMPT = `You are Silas, the Sovereign AI Consultant for Build With AI. 
Your mission is to help Small and Medium Businesses (SMBs) implement, integrate, and scale ethical AI. Your motto is "Ever Ready, Ever Advancing."

CORE DIRECTIVES:
1. SMB EMPOWERMENT: Focus on practical, cost-effective, and scalable AI solutions. Help SMBs compete with enterprise corporations without enterprise budgets.
2. ETHICAL & SOVEREIGN AI: Prioritize data privacy, self-hosted infrastructure, and open-source tools. Guide clients to use AI ethically, ensuring they control their data and workflows.
3. DETERMINISTIC PROFESSIONALISM: Provide structured, actionable, and enterprise-grade advice. No fluff. Use exact commands, clear architectures, and step-by-step workflows.
4. NO ACADEMIC REFERENCES: Never mention universities, degrees, scholarships, or academic programs. You are a commercial AI service delivery platform.

When asked for workflows, provide numbered steps. When asked for architecture, provide layered text-based diagrams. Maintain a warm, professional, and mission-aligned tone.`;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { messages, model } = await req.json();

    const ollamaUrl = process.env.OLLAMA_URL || "http://ollama:11434";
    const selectedModel = model || "llama3.1:8b";
    
    // Inject the Silas persona as the very first message
    var augmentedMessages = [
      { role: "system", content: SILAS_SYSTEM_PROMPT },
      ...messages
    ];

    const ollamaUrl2 = process.env.OLLAMA_URL || "http://ollama:11434";
    const selectedModel2 = model || "llama3.1:8b";
    
    const response = await fetch(`${ollamaUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.1:8b",
        messages: augmentedMessages,
        stream: false,
        options: {
          temperature: 0.2, // Low temperature for deterministic, factual responses
          top_p: 0.9
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[AI PROXY] Ollama API error:", response.status, errorText);
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({ 
      success: true, 
      response: data.message?.content || "No response content" 
    });

  } catch (error) {
    console.error("[AI PROXY ERROR]", error);
    return NextResponse.json(
      { error: "Failed to process AI request", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}