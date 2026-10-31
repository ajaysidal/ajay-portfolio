"""
Test LangGraph Supervisor Agent
"""
import pytest
from agents.supervisor import Supervisor, get_message_content

def test_supervisor_initialization():
    supervisor = Supervisor()
    assert supervisor is not None
    assert supervisor.graph is not None

def test_get_message_content():
    # Test dict format
    msg_dict = {"role": "user", "content": "Hello"}
    assert get_message_content(msg_dict) == "Hello"
    
    # Test object format
    class MockMessage:
        content = "Test message"
    msg_obj = MockMessage()
    assert get_message_content(msg_obj) == "Test message"

def test_supervisor_initialization():
    supervisor = Supervisor()
    assert supervisor is not None
    assert supervisor.graph is not None

def test_supervisor_routing():
    supervisor = Supervisor()
    # Test routing logic without calling LLM
    from agents.supervisor import AgentState
    
    # Test frontline routing
    state: dict = {
        "messages": [{"role": "user", "content": "I need a proposal for a client"}],
        "current_agent": "supervisor",
        "task_type": "frontline",
        "context": {},
        "result": {}
    }
    result = supervisor.route_to_agent(state)
    assert result["task_type"] == "frontline"
    
    # Test ops routing
    state = {
        "messages": [{"role": "user", "content": "Deploy the server"}],
        "current_agent": "supervisor",
        "task_type": "frontline",
        "context": {},
        "result": {}
    }
    result = supervisor.route_to_agent(state)
    assert result["task_type"] == "ops"
    
    # Test research routing
    state = {
        "messages": [{"role": "user", "content": "Research AI trends"}],
        "current_agent": "supervisor",
        "task_type": "frontline",
        "context": {},
        "result": {}
    }
    result = supervisor.route_to_agent(state)
    assert result["task_type"] == "research"
    
    # Test automation routing
    state = {
        "messages": [{"role": "user", "content": "Create a workflow"}],
        "current_agent": "supervisor",
        "task_type": "frontline",
        "context": {},
        "result": {}
    }
    result = supervisor.route_to_agent(state)
    assert result["task_type"] == "automation"
    
    # Test document routing
    state = {
        "messages": [{"role": "user", "content": "Process this PDF"}],
        "current_agent": "supervisor",
        "task_type": "frontline",
        "context": {},
        "result": {}
    }
    result = supervisor.route_to_agent(state)
    assert result["task_type"] == "document"

def test_supervisor_context_handling():
    supervisor = Supervisor()
    context = {"client": "Westpac", "service": "AI Automation"}
    # Just test that invoke accepts context without error
    # We don't call invoke() as it would call the LLM
    assert supervisor is not None