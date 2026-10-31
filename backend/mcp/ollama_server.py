"""
Ollama MCP Server - Local Inference & Embeddings
"""
from mcp.server import Server
from mcp.server.stdio import stdio_server
from langchain_ollama import ChatOllama, OllamaEmbeddings
import json

ollama_server = Server("ollama-mcp")

@ollama_server.call_tool()
async def generate_completion(model: str, prompt: str, temperature: float = 0.1) -> dict:
    """Generate text completion using Ollama."""
    llm = ChatOllama(model=model, base_url="http://ollama:11434", temperature=temperature)
    response = llm.invoke(prompt)
    return {"content": response.content}

@ollama_server.call_tool()
async def generate_embedding(model: str, text: str) -> list:
    """Generate embeddings for semantic search."""
    embeddings = OllamaEmbeddings(model=model, base_url="http://ollama:11434")
    return embeddings.embed_query(text)

@ollama_server.call_tool()
async def list_models() -> list:
    """List available Ollama models."""
    import requests
    response = requests.get("http://ollama:11434/api/tags")
    return response.json().get("models", [])

if __name__ == "__main__":
    import asyncio
    async def main():
        async with stdio_server() as (read_stream, write_stream):
            await ollama_server.run(read_stream, write_stream)
    
    asyncio.run(main())