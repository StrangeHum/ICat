from pydantic import BaseModel

class GenerationRequest(BaseModel):
    prompt: str
    context: list[str] | None = None

class GenerationResponse(BaseModel):
    response: str