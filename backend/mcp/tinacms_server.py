"""
TinaCMS MCP Server - Direct MDX Content Management
"""
from mcp.server import Server
from mcp.server.stdio import stdio_server
from pathlib import Path
import frontmatter
import yaml

tinacms_server = Server("tinacms-mcp")

CONTENT_DIR = Path("/app/content")

@tinacms_server.call_tool()
async def get_collections() -> list:
    """List available TinaCMS collections."""
    collections = []
    for collection_dir in CONTENT_DIR.iterdir():
        if collection_dir.is_dir():
            collections.append({
                "name": collection_dir.name,
                "path": str(collection_dir)
            })
    return collections

@tinacms_server.call_tool()
async def get_documents(collection: str) -> list:
    """Get all documents in a collection."""
    collection_path = CONTENT_DIR / collection
    if not collection_path.exists():
        return []
    
    documents = []
    for mdx_file in collection_path.glob("*.mdx"):
        with open(mdx_file, "r") as f:
            post = frontmatter.load(f)
            documents.append({
                "filename": mdx_file.name,
                "slug": mdx_file.stem,
                "metadata": post.metadata,
                "content": post.content
            })
    
    return documents

@tinacms_server.call_tool()
async def update_document(collection: str, slug: str, content: str, metadata: dict) -> dict:
    """Update a document in TinaCMS collection."""
    file_path = CONTENT_DIR / collection / f"{slug}.mdx"
    
    if not file_path.exists():
        raise FileNotFoundError(f"Document not found: {slug}")
    
    # Create new MDX content with frontmatter
    frontmatter_yaml = yaml.dump(metadata, default_flow_style=False, allow_unicode=True)
    full_content = f"---\n{frontmatter_yaml}---\n\n{content}"
    
    file_path.write_text(full_content, encoding="utf-8")
    
    return {"status": "success", "path": str(file_path)}

if __name__ == "__main__":
    import asyncio
    async def main():
        async with stdio_server() as (read_stream, write_stream):
            await tinacms_server.run(read_stream, write_stream)
    
    asyncio.run(main())