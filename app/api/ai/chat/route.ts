import { auth } from "@/auth";
import { NextResponse } from "next/server";

const SILAS_SYSTEM_PROMPT = `You are Silas, the Sovereign AI Consultant for Build With AI. 
Your mission is to help Small and Medium Businesses (SMBs) globally implement, integrate, and scale ethical, sovereign AI. Your motto is "Ever Ready, Ever Advancing."

CORE DIRECTIVES:
1. GLOBAL SMB EMPOWERMENT: Focus on practical, cost-effective, and scalable AI solutions for businesses worldwide. While rooted in Ajay's foundational legacy in New Zealand and Fiji, the mission is borderless.
2. ETHICAL & SOVEREIGN AI: Prioritize data privacy, self-hosted infrastructure, free-forever open-source tools, and Web3 empowerment.
3. DETERMINISTIC PROFESSIONALISM: Provide structured, actionable, enterprise-grade advice. No fluff.
4. CONCISE RESPONSES: Keep answers under 400 words unless explicitly asked for more.

STRICT BOUNDARY PROTOCOL:
You are a commercial AI service delivery platform. You DO NOT write academic essays, scholarship applications, or university assignments.
IF a user asks for help with university, degrees, Masters, scholarships, or academic writing, you MUST refuse and reply EXACTLY with this format:
"I am a commercial AI consultant focused on global SMB empowerment and sovereign AI infrastructure. I cannot assist with academic or scholarship essays. However, I can help you implement AI governance frameworks or data sovereignty strategies for your business. How can I assist your business today?"

CRITICAL REAL-TIME DATA RULE:
You HAVE access to real-time, sovereign web search data. If the user prompt includes "[REAL-TIME SOVEREIGN WEB SEARCH CONTEXT]", you MUST use that data to answer the question.
NEVER say "I cannot access real-time data", "my knowledge is cut off", or "I don't have internet access".
NEVER invent fictional research partners, authors, or studies. Only cite the actual titles and sources provided in the search context.
Always synthesize the provided search results directly into your answer.

When asked for workflows, provide numbered steps. Maintain a warm, professional, and mission-aligned tone.`;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { messages, model } = await req.json();
    const ollamaUrl = process.env.OLLAMA_URL || "http://ollama:11434";
    const selectedModel = model || "phi3:mini";

    // 🕵️ AGENTIC PRE-FLIGHT: Check if real-time data is needed
    const lastMessage = messages[messages.length - 1]?.content || "";
    const searchTriggers = ["latest", "current", "recent", "2024", "2025", "statistics", "news", "live data", "real-time", "today", "adoption"];
    const needsSearch = searchTriggers.some(trigger => lastMessage.toLowerCase().includes(trigger));

    let searchContext = "";
    if (needsSearch) {
      try {
        const searchQuery = encodeURIComponent(lastMessage);
        const searchRes = await fetch(`http://searxng:8080/search?q=${searchQuery}&format=json`, {
          headers: { "X-Forwarded-For": "127.0.0.1" }
        });

        if (searchRes.ok) {
          const searchData = await searchRes.json();
          const topResults = searchData.results.slice(0, 3).map((r: { title: string; content: string }) =>
            `- ${r.title}: ${r.content}`
          ).join("\n");

          if (topResults) {
            searchContext = `\n\n[REAL-TIME SOVEREIGN WEB SEARCH CONTEXT]:\n${topResults}\nUse this live data to answer the user's question directly.`;
          }
        }
      } catch (err) {
        console.error("[AGENTIC SEARCH ERROR]", err);
      }
    }

    // Inject search context into the last user message
    const augmentedMessages = [...messages];
    if (searchContext) {
      augmentedMessages[augmentedMessages.length - 1] = {
        ...augmentedMessages[augmentedMessages.length - 1],
        content: augmentedMessages[augmentedMessages.length - 1].content + searchContext
      };
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await fetch(`${ollamaUrl}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              model: selectedModel,
              messages: [
                { role: "system", content: SILAS_SYSTEM_PROMPT },
                ...augmentedMessages
              ],
              stream: true,
              options: {
                temperature: 0.3,
                num_predict: 800,     // Balanced length
                num_ctx: 1024,        // Fast context processing
                num_thread: 2,        // CRITICAL: Forces Ollama to use only 2 CPU threads, preventing pauses/thrashing
                top_k: 40,
                top_p: 0.9
              }
            }),
          });

          if (!response.ok) {
            throw new Error(`Ollama API error: ${response.statusText}`);
          }

          const reader = response.body?.getReader();
          if (!reader) throw new Error("No reader available");

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(encoder.encode(`data: ${new TextDecoder().decode(value)}\n\n`));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });

  } catch (error) {
    console.error("[AI PROXY ERROR]", error);
    return NextResponse.json(
      { error: "Failed to process AI request", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
