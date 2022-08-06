from typing import List
from pydantic import BaseModel


class HostIn(BaseModel):
    ip: str
    post: int


class CardIn(BaseModel):
    title: str
    short_description: str
    description: str
    executor: str
    checker_key: str
    hosts: List[HostIn]
    need_notify: bool
    tags: List[str]


class ColumnIn(BaseModel):
    title: str


class CheckerInfoIn(BaseModel):
    key: str
    status: str  # TODO
    logs: str  # TODO


