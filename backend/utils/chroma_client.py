"""
ChromaDB Vector Memory Client
"""
import chromadb
from chromadb.config import Settings
from langchain_ollama import OllamaEmbeddings
from typing import List, Dict

class ChromaMemory:
    def __init__(self):
        self.client = chromadb.HttpClient(
            host="chromadb",
            port=8000,
            settings=Settings(anonymized_telemetry=False)
        )
        
        self.embeddings = OllamaEmbeddings(
            model="nomic-embed-text",
            base_url="http://ollama:11434"
        )
        
        # Create or get collections
        self.knowledge_base = self.client.get_or_create_collection(
            name="knowledge_base",
            metadata={"description": "SOPs, playbooks, contracts"}
        )
        
        self.client_interactions = self.client.get_or_create_collection(
            name="client_interactions",
            metadata={"description": "Past client engagements and outcomes"}
        )
    
    def add_knowledge(self, documents: List[str], metadatas: List[Dict], ids: List[str]):
        """Add documents to knowledge base."""
        embeddings = self.embeddings.embed_documents(documents)
        
        self.knowledge_base.upsert(
            embeddings=embeddings,
            documents=documents,
            metadatas=metadatas,
            ids=ids
        )
    
    def retrieve_knowledge(self, query: str, n_results: int = 5) -> List[Dict]:
        """Retrieve relevant knowledge for a query."""
        query_embedding = self.embeddings.embed_query(query)
        
        results = self.knowledge_base.query(
            query_embeddings=[query_embedding],
            n_results=n_results
        )
        
        return [
            {
                "document": doc,
                "metadata": meta,
                "distance": dist
            }
            for doc, meta, dist in zip(
                results["documents"][0],
                results["metadatas"][0],
                results["distances"][0]
            )
        ]
    
    def add_client_interaction(self, client_id: str, interaction: str, outcome: str):
        """Store client interaction for future learning."""
        content = f"Client: {client_id}\nInteraction: {interaction}\nOutcome: {outcome}"
        embedding = self.embeddings.embed_query(content)
        
        self.client_interactions.upsert(
            embeddings=[embedding],
            documents=[content],
            metadatas=[{"client_id": client_id, "outcome": outcome}],
            ids=[f"{client_id}_{interaction[:20]}"]
        )

# Singleton instance
chroma_memory = ChromaMemory()