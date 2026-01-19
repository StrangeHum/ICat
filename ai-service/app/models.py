from pydantic import BaseModel
from typing import Optional, Dict, Any, List

class GenerationRequest(BaseModel):
    prompt: str
    context: Optional[List[str]] = None

class GenerationResponse(BaseModel):
    response: str
    meta: Optional[Dict[str, Any]] = None