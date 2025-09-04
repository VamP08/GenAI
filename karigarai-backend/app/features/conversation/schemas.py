from pydantic import BaseModel
from typing import List

class ConversationMessage(BaseModel):
    role: str
    content: str

class ConversationRequest(BaseModel):
    conversation_history: List[ConversationMessage]