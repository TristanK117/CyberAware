import firebase_admin
from firebase_admin import credentials, firestore
import os
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from datetime import datetime

# ------------------ Firebase (SAFE INIT) ------------------
db = None

try:
    service_account_info = os.getenv("FIREBASE_SERVICE_ACCOUNT")

    if service_account_info:
        cred = credentials.Certificate(json.loads(service_account_info))
    else:
        # fallback for local dev
        cred = credentials.Certificate("serviceAccountKey.json")

    firebase_admin.initialize_app(cred)

    db = firestore.client()

except Exception as e:
    print("Firebase not available:", e)

# ------------------ Import Routes ------------------
from app.database import engine
from app.routes.chat import router as chat_router
from app.routes.user import router as user_router

# ------------------ FastAPI App ------------------
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ Routes ------------------

# Health check
@app.get("/")
def health():
    return {
        "status": "running",
        "firebase": "connected" if db else "not connected"
    }

# DB test
@app.get("/db-test")
def db_test():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    return {"db": "connected"}

# Include routes
app.include_router(chat_router)
app.include_router(user_router)