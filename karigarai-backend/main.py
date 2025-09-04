from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api_router import router as api_router

app = FastAPI(
    title="Karigarai AI API",
    description="API for the Karigarai project to power artisan onboarding and content generation.",
    version="1.0.0"
)

# Add CORS Middleware
origins = ["http://localhost:5173", "http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the main API router
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "Welcome to the Karigarai FastAPI Backend!"}