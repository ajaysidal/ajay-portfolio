"""
Silas Prime FastAPI Gateway
Exposes LangGraph agents and MCP tools via REST API.
"""
from fastapi import FastAPI, HTTPException, Depends, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from contextlib import asynccontextmanager
import os

from agents.supervisor import Supervisor

# Security
security = HTTPBearer()
API_KEY = os.getenv("SILAS_API_KEY", "dev-key-change-in-production")

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    # Initialize supervisor
    app.state.supervisor = Supervisor()
    print("✅ Silas Prime Cognitive OS initialized")
    yield
    # Cleanup
    print(" Silas Prime shutting down")

app = FastAPI(
    title="Silas Prime Cognitive OS",
    description="Sovereign Multi-Agent AI System",
    version="1.0.0",
    lifespan=lifespan
)

# Request/Response Models
class ChatRequest(BaseModel):
    message: str
    context: Optional[Dict[str, Any]] = None
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    agent_trace: List[Dict]
    session_id: str

# Security
async def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    if credentials.credentials != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")
    return credentials.credentials

# API Endpoints
@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "silas-prime"}

@app.post("/v1/chat/completions", response_model=ChatResponse)
async def chat_completions(
    request: ChatRequest,
    token: str = Depends(verify_token)
):
    """
    Main chat endpoint compatible with OpenAI API format.
    Routes to LangGraph supervisor for multi-agent processing.
    """
    try:
        # Invoke supervisor agent
        result = app.state.supervisor.invoke(
            user_input=request.message,
            context=request.context
        )
        
        return ChatResponse(
            response=result.get("result", {}).get("response", ""),
            agent_trace=result.get("messages", []),
            session_id=request.session_id or "new-session"
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/mcp/tools")
async def list_mcp_tools(token: str = Depends(verify_token)):
    """List all available MCP tools."""
    return {
        "ollama": ["generate_completion", "generate_embedding", "list_models"],
        "search": ["web_search", "academic_search"],
        "filesystem": ["read_file", "write_file", "list_directory"],
        "tinacms": ["get_collections", "get_documents", "update_document"],
        "stirling_pdf": ["extract_text", "merge_pdfs", "redact_pdf", "add_watermark"]
    }

@app.post("/mcp/call/{tool_name}")
async def call_mcp_tool(
    tool_name: str,
    tool_args: Dict[str, Any],
    token: str = Depends(verify_token)
):
    """Call a specific MCP tool."""
    # Implementation: Route to appropriate MCP server
    return {"status": "not_implemented", "tool": tool_name}

@app.get("/sessions/{session_id}/history")
async def get_session_history(
    session_id: str,
    token: str = Depends(verify_token)
):
    """Retrieve conversation history for a session."""
    return {"session_id": session_id, "history": []}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)