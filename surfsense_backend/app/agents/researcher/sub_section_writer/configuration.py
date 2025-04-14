"""Define the configurable parameters for the agent."""

from __future__ import annotations

from dataclasses import dataclass, fields
from typing import Optional, List

from langchain_core.runnables import RunnableConfig


@dataclass(kw_only=True)
class Configuration:
    """The configuration for the agent."""

    # Input parameters provided at invocation
    sub_section_title: str
    sub_questions: List[str]
    connectors_to_search: List[str]
    user_id: str
    search_space_id: int
    top_k: int = 20  # Default top_k value


    @classmethod
    def from_runnable_config(
        cls, config: Optional[RunnableConfig] = None
    ) -> Configuration:
        """Create a Configuration instance from a RunnableConfig object."""
        configurable = (config.get("configurable") or {}) if config else {}
        _fields = {f.name for f in fields(cls) if f.init}
        return cls(**{k: v for k, v in configurable.items() if k in _fields})
