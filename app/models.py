from sqlalchemy import Column, Integer, String, ForeignKey, Table, Boolean
from sqlalchemy.orm import relationship

from app.database import Base, engine


class CardModel(Base):
    __tablename__ = "cards"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    short_description = Column(String(500), nullable=True)
    description = Column(String, nullable=True)
    executor = Column(String(255), nullable=True)
    tag = Column(String(255), nullable=True)
    host = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=False)
    column_id = Column(Integer, ForeignKey("columns.id"))

    column = relationship("ColumnModel", back_populates="cards")


class ColumnModel(Base):
    __tablename__ = 'columns'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)

    cards = relationship("CardModel", back_populates="column")


class CheckerModel(Base):
    __tablename__ = 'checkers'

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(255), primary_key=True)
    status = Column(String(255))
    logs = Column(String)


Base.metadata.create_all(engine)
