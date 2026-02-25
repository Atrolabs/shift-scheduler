"""FastAPI main entrypoint"""

from fastapi import FastAPI
from mangum import Mangum
from api.api import router

app = FastAPI()

# Apply global /api prefix to all routes
app.include_router(router, prefix="/api")

handler = Mangum(app)
