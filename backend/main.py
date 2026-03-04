"""FastAPI main entrypoint"""

import logging

from fastapi import FastAPI
from mangum import Mangum

from api.api import router

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")

app = FastAPI()

# Apply global /api prefix to all routes
app.include_router(router, prefix="/api")

handler = Mangum(app)
