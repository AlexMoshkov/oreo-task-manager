from fastapi import FastAPI
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from app.dto.requests import CardIn, ColumnIn, CheckerInfoIn
from app.database import engine


db = Session(engine)
app = FastAPI()


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/api/card/{id}")
async def get_card(id: str) -> JSONResponse:
    ...


@app.post("/api/card")
async def create_card(data: CardIn) -> JSONResponse:
    ...


@app.put("/api/card/{id}")
async def update_card(id: str, data: CardIn) -> JSONResponse:
    ...


@app.delete("/api/card/{id}")
async def delete_card(id: str) -> JSONResponse:
    ...


@app.get("/api/column/{id}")
async def get_column(id: str) -> JSONResponse:
    ...


@app.post("/api/column")
async def create_column(data: ColumnIn) -> JSONResponse:
    ...


@app.put("/api/column/{id}")
async def update_column(id: str, data: ColumnIn) -> JSONResponse:
    ...


@app.delete("/api/column/{id}")
async def delete_column(id: str) -> JSONResponse:
    ...


@app.post("/api/checker")
async def get_checker_info(data: CheckerInfoIn):
    ...
