from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = "mongodb://mongo:27017"
client = AsyncIOMotorClient(MONGO_URI)
db = client.drawing_app