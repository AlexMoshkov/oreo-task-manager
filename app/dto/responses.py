from pydantic import BaseModel


class SuccessResponse(BaseModel):
    success: bool = True


class ErrorResponse(BaseModel):
    message: str = "Not Found"


class HostOut(BaseModel):
    id: int
    host: str

    class Config:
        orm_mode = True
