# Project Tourmaline — Monorepo AI Agent Guidelines

## Core Principles & Philosophy

- **Educational Infinite Playground:** Code must prioritize clarity, maintainability, and clean architecture over premature micro-optimizations.
- **No Full Code Generation:** Always provide structural boilerplates, structural templates, documentation, or targeted code suggestions. The core business logic should be written iteratively.
- **Strict Modularity:** Maintain loose coupling between services. Cross-service communication must strictly use gRPC or event-driven messaging (Kafka/RabbitMQ).
- **Security & Privacy:** Sensitive data (OAuth tokens, financial data, credentials) MUST be stored encrypted in HashiCorp Vault or database encryption layers. Local LLMs (Ollama/llama.cpp) are preferred for sensitive pipelines.

## Monorepo Layout

- `/apps/*`: User interfaces (Web Next.js/Nuxt, Desktop Wails, Mobile Flutter/RN).
- `/services/*`: Polyglot microservices (`auth`, `gateway`, `storage`, `mail`, `finance`, `career`, `ai-engine`).
- `/packages/*`: Shared schemas, protobuf files, DTOs, and utility modules.
- `/infra/*`: Docker, Traefik, Vault, Terraform, Ansible, and Observability configs.

## Coding Standards & Conventions

- **Formatting:** Respect `.editorconfig` rules (YAML uses 2 spaces; JSON and all other code file types use 4 spaces).
- **Naming Conventions:**
  - Services/Folders: `kebab-case` (e.g., `services/ai-engine`).
  - Go/Python/Java/Elixir/Node: Follow each language's idiomatic style guide and standard linting configurations.
- **Commit Messages:** Follow Conventional Commits format (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `ci:`).

## Workflow Guidelines

- All services must contain their own `Dockerfile` and independent test suites.
- CI/CD pipelines in `.github/workflows/` validate each service independently based on path changes.
