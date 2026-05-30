from fastapi import FastAPI
from app.routes.chat import router
from app.services.ml_service import MLService

app = FastAPI()
app.include_router(router)

@app.get("/")
async def root():
    """Health check endpoint that verifies ml-service is connected"""
    try:
        ml_service = MLService()
        return {"ml-service": "connected"}
    except Exception as e:
        return {"ml-service": "not connected", "error": str(e)}