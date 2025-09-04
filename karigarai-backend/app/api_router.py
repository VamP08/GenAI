from fastapi import APIRouter
from app.features.conversation import router as conversation_router

router = APIRouter()

# Include feature-specific routers here
router.include_router(conversation_router, prefix="/conversation", tags=["Conversation"])