from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, images

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from your React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the Drawing App API"}

# Include other routers
app.include_router(auth.router)
app.include_router(images.router)
app.include_router(drawings.router)