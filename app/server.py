from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.dto.requests import CardIn, ColumnData, CheckerInfoIn, CardUpdate, ShortCardOut, ColumnOut
from app.database import engine
from . import models
from .dto.responses import SuccessResponse, ErrorResponse, HostOut

db = Session(engine)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/card/{id}")
async def get_card(id: str) -> JSONResponse:
    stmt = select(models.CardModel).where(models.CardModel.id == id)
    card = db.scalar(stmt)
    if not card:
        return JSONResponse(status_code=400, content=ErrorResponse().dict())
    return CardIn.from_orm(card)


@app.post("/api/card")
async def create_card(data: CardIn) -> JSONResponse:
    db.flush()
    card = models.CardModel(
        title=data.title,
        short_description=data.short_description,
        description=data.description,
        executor=data.executor,
        tag=data.tag,
        host=data.host,
        column_id=data.column_id,
    )
    db.add(card)
    db.commit()
    return JSONResponse(status_code=200, content=SuccessResponse().dict())


@app.put("/api/card/{id}")
async def update_card(id: str, data: CardUpdate) -> JSONResponse:
    stmt = select(models.CardModel).where(models.CardModel.id == id)
    card = db.scalar(stmt)
    if not card:
        return JSONResponse(status_code=400, content=ErrorResponse().dict())
    for key, val in data.dict().items():
        setattr(card, key, val)
    db.commit()
    return JSONResponse(status_code=200, content=SuccessResponse().dict())


@app.delete("/api/card/{id}")
async def delete_card(id: str) -> JSONResponse:
    stmt = select(models.CardModel).where(models.CardModel.id == id)
    card = db.scalar(stmt)
    if not card:
        return JSONResponse(status_code=400, content=ErrorResponse().dict())
    db.delete(card)
    db.commit()
    return JSONResponse(status_code=200, content=SuccessResponse().dict())


@app.get("/api/column/{id}")
async def get_column(id: str) -> JSONResponse:
    stmt = select(models.ColumnModel).where(models.ColumnModel.id == id)
    column = db.scalar(stmt)
    if not column:
        return JSONResponse(status_code=400, content=ErrorResponse().dict())
    return ColumnData.from_orm(column)


@app.post("/api/column")
async def create_column(data: ColumnData) -> JSONResponse:
    column = models.ColumnModel(title=data.title)
    if not column:
        return JSONResponse(status_code=400, content=ErrorResponse().dict())
    db.add(column)
    db.commit()
    return JSONResponse(status_code=200, content=SuccessResponse().dict())


@app.get("/api/column")
async def get_all_column() -> JSONResponse:
    stmt = select(models.ColumnModel)
    columns = db.scalars(stmt)
    if not columns:
        return JSONResponse(status_code=400, content=ErrorResponse().dict())
    columns_out = []
    for column in columns:
        stmt = select(models.CardModel).where(models.CardModel.column_id == column.id)
        cards = db.scalars(stmt)
        cards = [ShortCardOut.from_orm(card) for card in cards]
        columns_out.append(ColumnOut(title=column.title, cards=cards))
    return JSONResponse(status_code=200, content=jsonable_encoder(columns_out))


@app.post("/api/checker")
async def get_checker_info(data: CheckerInfoIn):
    stmt = select(models.CardModel).where(models.CardModel.id == id)
    cards = db.scalars(stmt)
    if not cards:
        return JSONResponse(status_code=400, content=ErrorResponse().dict())
    for card in cards:
        card.is_active = True
    db.commit()
    return JSONResponse(status_code=200, content=SuccessResponse().dict())


@app.get("/api/hostlist")
async def get_hostlist() -> JSONResponse:
    stmt = select(models.CardModel)
    cards = db.scalars(stmt)
    cards = [HostOut.from_orm(card) for card in cards]
    return JSONResponse(status_code=200, content=jsonable_encoder(cards))
