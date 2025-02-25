from pydantic import BaseModel

class Drawing(BaseModel):
    username: str
    image_url: str
    strokes: list