from fastapi import FastAPI
from app.routes.chat import router

app = FastAPI()
app.include_router(router)

@app.get("/")
async def root():
    return {"message": "ml-service: connected"}