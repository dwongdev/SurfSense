"""Define the state structures for the agent.
File Hash: L0o55JzTBlCYJNCRYbbxt8mxqRs5kPm6QO8NzVqEZtzqWtG0EklbHuQ3I5ZBdSy8n+EqrdQxcp+R3Yc57NIm79iNS2sxt4tVMSTLeAT6qpMS2SbBER4hRiLaH5BKpXBJoCRPoFMYpDf6pdIokZyJz/EQWQZj531TfLcBfFkxJuWEqvinKhvWJPjApBd1RldixOj57mNXybHN8WFe+FnayhYQhptesoFAVXAk1WuV2URSqXxs5/00Eo8osC55gsye6LXTYzieyUKxurLKw+uy3g==
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import List, Optional, Any
from sqlalchemy.ext.asyncio import AsyncSession

@dataclass
class State:
    """Defines the dynamic state for the agent during execution.

    This state tracks the database session and the outputs generated by the agent's nodes.
    See: https://langchain-ai.github.io/langgraph/concepts/low_level/#state
    for more information.
    """
    # Runtime context
    db_session: AsyncSession
    
    chat_history: Optional[List[Any]] = field(default_factory=list)
    # OUTPUT: Populated by agent nodes
    reranked_documents: Optional[List[Any]] = None
    final_answer: Optional[str] = None

