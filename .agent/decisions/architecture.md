# Architecture Decision

Architecture:

- Feature-based architecture

Structure:

src/
features/
components/
lib/
hooks/
services/

Rules:

- Features should be isolated
- Shared UI goes to components/ui
- Avoid business logic in UI components
