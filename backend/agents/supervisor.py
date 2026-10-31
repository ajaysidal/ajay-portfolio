"""
Sovereign Supervisor Agent - The Conductor
Routes intent to specialized sub-agents based on task analysis.
"""
from typing import TypedDict, Annotated, Literal, Union
from langgraph.graph import StateGraph, END
from langchain_ollama import ChatOllama
import operator

# Agent Types
AgentType = Literal["frontline", "ops", "research", "automation", "document"]

# Message can be either dict or object with content attribute
MessageType = Union[dict, object]

class AgentState(TypedDict):
    messages: Annotated[list, operator.add]
    current_agent: str
    task_type: Literal["frontline", "ops", "research", "automation", "document"]
    context: dict
    result: dict

def get_message_content(message: MessageType) -> str:
    """Extract content from message regardless of format (dict or object)."""
    if isinstance(message, dict):
        return message.get("content", "")
    return getattr(message, "content", "")

class Supervisor:
    def __init__(self):
        self.llm = ChatOllama(
            model="qwen2.5:7b",
            base_url="http://ollama:11434",
            temperature=0.1
        )
        self.graph = self._build_graph()
    
    def _build_graph(self):
        """Build the LangGraph state machine."""
        workflow = StateGraph(AgentState)
        
        # Add nodes for each agent
        workflow.add_node("route", self.route_to_agent)
        workflow.add_node("frontline", self.frontline_agent)
        workflow.add_node("ops", self.ops_agent)
        workflow.add_node("research", self.research_agent)
        workflow.add_node("automation", self.automation_agent)
        workflow.add_node("document", self.document_agent)
        workflow.add_node("synthesize", self.synthesize_response)
        
        # Entry point: route to appropriate agent
        workflow.set_entry_point("route")
        workflow.add_conditional_edges(
            "route",
            lambda state: state["task_type"],
            {
                "frontline": "frontline",
                "ops": "ops",
                "research": "research",
                "automation": "automation",
                "document": "document"
            }
        )
        
        # All agents return to supervisor for final synthesis
        for agent in ["frontline", "ops", "research", "automation", "document"]:
            workflow.add_edge(agent, "synthesize")
        
        workflow.add_edge("synthesize", END)
        
        return workflow.compile()
    
    def route_to_agent(self, state: AgentState) -> AgentState:
        """Analyze intent and route to appropriate agent."""
        last_message = state["messages"][-1]
        last_message_lower = get_message_content(last_message).lower()
        
        if any(kw in last_message for kw in ["client", "proposal", "meeting", "email", "call"]):
            state["task_type"] = "frontline"
        elif any(kw in last_message for kw in ["deploy", "infrastructure", "server", "docker", "kubernetes", "cicd"]):
            state["task_type"] = "ops"
        elif any(kw in last_message for kw in ["research", "search", "find", "analyze", "study"]):
            state["task_type"] = "research"
        elif any(kw in last_message for kw in ["automate", "workflow", "n8n", "pipeline", "automation"]):
            state["task_type"] = "automation"
        elif any(kw in last_message for kw in ["document", "pdf", "contract", "extract", "redact"]):
            state["task_type"] = "document"
        else:
            state["task_type"] = "frontline"
        
        return state
    
    def frontline_agent(self, state: AgentState) -> AgentState:
        """Handle client-facing communication."""
        prompt = f"""You are Silas, the Frontline Agent. Handle client-facing communication.
        
User message: {get_message_content(state['messages'][-1])}
Context: {state.get('context', {})}

Provide a professional, structured response."""
        
        response = self.llm.invoke(prompt)
        state["messages"].append({"role": "assistant", "content": response.content})
        state["result"] = {"agent": "frontline", "response": response.content}
        return state
    
    def ops_agent(self, state: AgentState) -> AgentState:
        """Manage scheduling, CRM, task boards."""
        prompt = f"""You are Silas, the Ops Agent. Handle infrastructure, deployment, scheduling, CRM tasks.
        
User message: {get_message_content(state['messages'][-1])}
Context: {state.get('context', {})}

Provide structured, actionable operational guidance."""
        
        response = self.llm.invoke(prompt)
        state["messages"].append({"role": "assistant", "content": response.content})
        state["result"] = {"agent": "ops", "response": response.content}
        return state
    
    def research_agent(self, state: AgentState) -> AgentState:
        """Execute searches, retrieve from ChromaDB."""
        prompt = f"""You are Silas, the Research Agent. Execute research, searches, analysis.
        
User message: {get_message_content(state['messages'][-1])}
Context: {state.get('context', {})}

Provide structured research findings with sources."""
        
        response = self.llm.invoke(prompt)
        state["messages"].append({"role": "assistant", "content": response.content})
        state["result"] = {"agent": "research", "response": response.content}
        return state
    
    def automation_agent(self, state: AgentState) -> AgentState:
        """Design and deploy n8n workflows."""
        prompt = f"""You are Silas, the Automation Agent. Design and deploy n8n workflows, pipelines.
        
User message: {get_message_content(state['messages'][-1])}
Context: {state.get('context', {})}

Provide workflow specifications and deployment steps."""
        
        response = self.llm.invoke(prompt)
        state["messages"].append({"role": "assistant", "content": response.content})
        state["result"] = {"agent": "automation", "response": response.content}
        return state
    
    def document_agent(self, state: AgentState) -> AgentState:
        """Process PDFs via Stirling PDF."""
        prompt = f"""You are Silas, the Document Agent. Process PDFs via Stirling PDF.
        
User message: {get_message_content(state['messages'][-1])}
Context: {state.get('context', {})}

Provide document processing guidance and results."""
        
        response = self.llm.invoke(prompt)
        state["messages"].append({"role": "assistant", "content": response.content})
        state["result"] = {"agent": "document", "response": response.content}
        return state
    
    def synthesize_response(self, state: AgentState) -> AgentState:
        """Combine agent outputs into final response."""
        # The last agent's response is already in messages
        # Just ensure we have a proper final state
        return state
    
    def invoke(self, user_input: str, context: dict = None) -> dict:
        """Main entry point for user queries."""
        initial_state = {
            "messages": [{"role": "user", "content": user_input}],
            "current_agent": "supervisor",
            "task_type": "frontline",
            "context": context or {},
            "result": {}
        }
        return self.graph.invoke(initial_state)

# Test the supervisor
if __name__ == "__main__":
    supervisor = Supervisor()
    result = supervisor.invoke("Draft a proposal for Westpac")
    print(result)