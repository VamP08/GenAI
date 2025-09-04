from fastapi import APIRouter
from .schemas import ConversationRequest # Use relative import
from .service import process_conversation_turn # Use relative import

router = APIRouter()

@router.post("/")
async def handle_conversation(request: ConversationRequest):
    """
    Manages one turn of the conversational Q&A flow with the artisan.
    """
    history_as_dicts = [msg.dict() for msg in request.conversation_history]
    response = process_conversation_turn(history_as_dicts)
    return response