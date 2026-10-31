"""
Sovereign Search MCP Server - SearXNG Integration
"""
from mcp.server import Server
from mcp.server.stdio import stdio_server
import aiohttp
import json

search_server = Server("sovereign-search-mcp")

@search_server.call_tool()
async def web_search(query: str, num_results: int = 5) -> list:
    """Execute sovereign web search via SearXNG."""
    async with aiohttp.ClientSession() as session:
        url = "http://searxng:8080/search"
        params = {"q": query, "format": "json", "pageno": 1}
        async with session.get(url, params=params) as response:
            data = await response.json()
            results = data.get("results", [])[:num_results]
            return [
                {
                    "title": r.get("title"),
                    "url": r.get("url"),
                    "content": r.get("content"),
                    "engine": r.get("engine")
                }
                for r in results
            ]

@search_server.call_tool()
async def academic_search(query: str) -> list:
    """Search academic sources (arXiv, PubMed, etc.)."""
    # Implementation: Query specific academic engines via SearXNG
    return []

if __name__ == "__main__":
    import asyncio
    async def main():
        async with stdio_server() as (read_stream, write_stream):
            await search_server.run(read_stream, write_stream)
    
    asyncio.run(main())