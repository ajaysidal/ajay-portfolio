"""
Test MCP Servers
"""
import pytest
from mcp.ollama_server import ollama_server
from mcp.search_server import search_server

@pytest.mark.asyncio
async def test_ollama_completion():
    result = await ollama_server.call_tool(
        "generate_completion",
        {"model": "qwen2.5:7b", "prompt": "Hello", "temperature": 0.1}
    )
    assert "content" in result

@pytest.mark.asyncio
async def test_sovereign_search():
    result = await search_server.call_tool(
        "web_search",
        {"query": "AI automation trends 2026", "num_results": 3}
    )
    assert isinstance(result, list)
    assert len(result) > 0