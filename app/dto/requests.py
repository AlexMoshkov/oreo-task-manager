from pydantic import BaseModel
from pydantic.typing import List


class CardOut(BaseModel):
    title: str
    short_description: str
    description: str
    executor: str
    host: str
    tag: str

    class Config:
        orm_mode = True


class CardIn(CardOut):
    column_id: int


class ColumnData(BaseModel):
    title: str

    class Config:
        orm_mode = True


class CheckerInfoIn(BaseModel):
    key: str
    status: bool  # TODO
    logs: str | None # TODO


class CardUpdate(BaseModel):
    title: str | None
    short_description: str | None
    description: str | None
    executor: str | None
    host: str | None
    tag: str | None


class ShortCardOut(BaseModel):
    title: str
    is_active: bool

    class Config:
        orm_mode = True


class ColumnOut(BaseModel):
    title: str
    cards: List[ShortCardOut]

