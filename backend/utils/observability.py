"""
Langfuse Observability Integration
"""
from langfuse import Langfuse
import os

langfuse = Langfuse(
    public_key=os.getenv("LANGFUSE_PUBLIC_KEY"),
    secret_key=os.getenv("LANGFUSE_SECRET_KEY"),
    host=os.getenv("LANGFUSE_HOST", "http://langfuse:3000")
)

def trace_agent_execution(agent_name: str, input_data: dict, output_data: dict):
    """Trace agent execution for observability."""
    trace = langfuse.trace(
        name=f"agent:{agent_name}",
        user_id="silas-prime"
    )
    
    trace.generation(
        name=agent_name,
        input=input_data,
        output=output_data
    )
    
    return trace

def log_tool_call(tool_name: str, args: dict, result: dict):
    """Log MCP tool calls."""
    langfuse.event(
        name="tool_call",
        data={
            "tool": tool_name,
            "args": args,
            "result": result
        }
    )

def get_session_analytics(session_id: str):
    """Retrieve analytics for a session."""
    # Implementation: Query Langfuse API
    pass