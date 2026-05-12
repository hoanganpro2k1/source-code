---
trigger: always_on
---

# API Rules

Architecture:

- REST API

Rules:

- Validate all inputs
- Never expose internal errors
- Use consistent response structure

Response format:

{
success: boolean,
message: string,
data?: unknown
}

Error handling:

- Return readable errors
- Avoid leaking stack traces
