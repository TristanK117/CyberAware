import os
import httpx
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.auth import verify_id_token

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
async def chat(req: ChatRequest, uid: str = Depends(verify_id_token)):
    """
    Chat endpoint for phishing/scam detection.
    
    Requires: Authorization header with Firebase ID token (Bearer <token>)
    The user's UID is verified and can be used for logging/tracking if needed.
    """
    try:
        async with httpx.AsyncClient() as client:
            ml_service_url = os.getenv("ML_SERVICE_URL", "http://localhost:8001")
            response = await client.post(
                f"{ml_service_url}/chat",
                json={"message": req.message},
                timeout=5
            )

        data = response.json()

        # Basic validation (important)
        if "is_scam" not in data:
            return {
                "is_scam": False,
                "risk_level": "unknown",
                "reason": "Invalid response from ML service"
            }

        return data

    except Exception as e:
        return {
            "is_scam": False,
            "risk_level": "unknown",
            "reason": f"ML service unavailable: {str(e)}"
        }