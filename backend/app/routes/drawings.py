from fastapi import APIRouter, Depends, HTTPException
from app.models.drawing import Drawing
from app.utils.db import db
from app.utils.auth import get_current_user

router = APIRouter()

@router.post("/drawings")
async def save_drawing(drawing: Drawing, current_user: str = Depends(get_current_user)):
    drawing.username = current_user
    await db.drawings.insert_one(drawing.dict())
    return {"message": "Drawing saved successfully"}

@router.get("/drawings")
async def get_drawings(current_user: str = Depends(get_current_user)):
    drawings = await db.drawings.find({"username": current_user}).to_list(None)
    return {"drawings": drawings}