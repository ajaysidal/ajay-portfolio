"""
Sandboxed Filesystem MCP Server
Only allows access to pre-approved directories.
"""
from mcp.server import Server
from mcp.server.stdio import stdio_server
from pathlib import Path
import json
import os

ALLOWED_PATHS = [
    Path("/app/content"),
    Path("/app/data"),
    Path("/tmp/silas")
]

fs_server = Server("filesystem-mcp")

def is_path_allowed(path: Path) -> bool:
    """Verify path is within allowed directories."""
    path = path.resolve()
    return any(str(path).startswith(str(allowed)) for allowed in ALLOWED_PATHS)

@fs_server.call_tool()
async def read_file(path: str) -> str:
    """Read a file from allowed directories."""
    file_path = Path(path)
    if not is_path_allowed(file_path):
        raise PermissionError(f"Access denied: {path} is not in allowed paths")
    
    if not file_path.exists():
        raise FileNotFoundError(f"File not found: {path}")
    
    return file_path.read_text(encoding="utf-8")

@fs_server.call_tool()
async def write_file(path: str, content: str) -> dict:
    """Write content to a file in allowed directories."""
    file_path = Path(path)
    if not is_path_allowed(file_path):
        raise PermissionError(f"Access denied: {path} is not in allowed paths")
    
    file_path.parent.mkdir(parents=True, exist_ok=True)
    file_path.write_text(content, encoding="utf-8")
    
    return {"status": "success", "path": str(file_path)}

@fs_server.call_tool()
async def list_directory(path: str) -> list:
    """List files in an allowed directory."""
    dir_path = Path(path)
    if not is_path_allowed(dir_path):
        raise PermissionError(f"Access denied: {path} is not in allowed paths")
    
    return [
        {
            "name": item.name,
            "type": "directory" if item.is_dir() else "file",
            "size": item.stat().st_size if item.is_file() else 0
        }
        for item in dir_path.iterdir()
    ]

if __name__ == "__main__":
    import asyncio
    async def main():
        async with stdio_server() as (read_stream, write_stream):
            await fs_server.run(read_stream, write_stream)
    
    asyncio.run(main())