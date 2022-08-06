from sqlalchemy import Column, Integer, String

from .database import Base


class CardModel(Base):
    __tablename__ = "cards"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    short_description = Column(String(500), nullable=True)
    description = Column(String, nullable=True)
    executor = Column(String(255), nullable=True)


class ColumnModel(Base):
    __tablename__ = 'columns'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)


class HostModel(Base):
    __tablename__ = 'hosts'

    ip = Column(String(20))
    port = Column(Integer)


class TagModel(Base):
    __tablename__ = 'tags'

    tag = Column(String(255))


class CheckerModel(Base):
    __tablename__ = 'checkers'

    key = Column(String(255))
    status = Column(String(255))
    logs = Column(String)
