from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.utils.auth import verify_password, create_access_token, get_password_hash
from app.models.user import User
from app.models.user import LoginRequest
from app.utils.db import db

router = APIRouter()

@router.post("/register")
async def register(user: User):
    existing_user = await db.users.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    user.password = get_password_hash(user.password)
    await db.users.insert_one(user.dict())
    return {"message": "User registered successfully"}


@router.post("/login")
async def login(login_request: LoginRequest, request: Request):
    body = await request.json()
    print("Received request body:", body)  # Debugging
    user = await db.users.find_one({"username": login_request.username})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    if not verify_password(login_request.password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": user["username"]})
    return {"access_token": access_token, "token_type": "bearer"}
