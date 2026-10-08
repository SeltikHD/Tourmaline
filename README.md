# 💎 Tourmaline — Smart Personal Executive OS

**Tourmaline** is a distributed personal operational ecosystem, built as a **continuous learning playground ("infinite project")** for me. The project's goal is to centralize productivity, financial management, communication intelligence, career automation, and file management in a modern event-driven microservices architecture.

## 🎯 General Idea & Philosophy

**Tourmaline** is not a product with a fixed delivery date, but rather a practical laboratory for study, constant refactoring, architectural experimentation, and the application of software engineering to real everyday problems.

### 📜 Project Rules

1. **Conscious Use of AI:** AI tools are restricted to boilerplate generation, code review, documentation, and refactoring suggestions. The final code and business logic must be written manually to ensure learning.
2. **Incremental Development:** The project evolves in well-defined stages, prioritizing stability and modularity before expansion.
3. **Real Needs:** Every added feature must solve a real everyday pain point.
4. **Modular Architecture:** Low coupling and high cohesion. New services can be added without altering the existing ecosystem.
5. **Open Source First:** Full priority for open and free standards, frameworks, and libraries.
6. **Strict Automation (CI/CD):** Every microservice has automated pipelines for testing, linting, build, and security validations in GitHub Actions before any deploy.

## 🚀 Main Features

* 📁 **Universal File Aggregator (`storage`):** Indexing and centralized access to multiple cloud providers (multi-account Google Drive) and local file systems.
* 📧 **Smart Email Client (`mail`):** Unification of IMAP/SMTP accounts with intelligent replies, inline suggestions, summarization, and automatic categorization via AI.
* 🤖 **Multimodal Personal Assistant (`assistant`):** Voice and text processing, task management, reminders, appointments, and intelligent intent routing.
* 💳 **Personal Financial Management (`finance`):** Import of bank/credit card statements, investment intelligence, transactional reports, and predictive consumption analysis.
* 💼 **Career & Job Automation (`career`):** Job scraping, intelligent profile-based filtering, integration with the Go/Wails engine for generating tailored PDF résumés, and automated application submission.

## 🏛️ System Architecture

The project adopts a **Monorepo** strategy for code governance, keeping microservices decoupled and polyglot.

```text
                          ┌───────────────────────────────────┐
                          │ Ingress & Security Layer          │
                          │ (Traefik / Nginx / HashiCorp)     │
                          └─────────────────┬─────────────────┘
                                            │
              ┌─────────────────────────────┼─────────────────────────────┐
              │                             │                             │
              ▼                             ▼                             ▼
┌───────────────────────────┐ ┌───────────────────────────┐ ┌───────────────────────────┐
│ Frontends & Clients       │ │ Core Domain Services      │ │ AI & Analytics Engine     │
├───────────────────────────┤ ├───────────────────────────┤ ├───────────────────────────┤
│ • Web Engine (Next/Nuxt)  │ │ • Mail Sync (Elixir/Phx)  │ │ • ML & Vision Engine      │
│ • SvelteKit Micro-apps    | │ • Finance (Spring/Quarkus)│ │ (FastAPI/PyTorch/OpenCV)  │
│ • Desktop (Wails/Go)      │ │ • Career Sync (Node/Bun)  │ │ • LLM Router              │
│ • Mobile (Flutter/RN/KMP) │ │ • Storage Engine (Go)     │ │ (Ollama/llama.cpp/OpenAI) │
└─────────────┬─────────────┘ └─────────────┬─────────────┘ └─────────────┬─────────────┘
              │                             │                             │
              └─────────────────────────────┼─────────────────────────────┘
                                            │
                                            ▼
                      ┌───────────────────────────────────────────┐
                      │ Data & Observability Pipeline             │
                      ├───────────────────────────────────────────┤
                      │ • Message Brokers: Apache Kafka / RabbitMQ│
                      │ • Databases: Postgres, Mongo, Redis, DBs  │
                      │ • Telemetry: OTEL, Jaeger, Grafana, Prom  │
                      └───────────────────────────────────────────┘
```

## 🧰 Technology Matrix by Service

### 1. Backend Services

| Service         | Technologies / Frameworks                             | Purpose                                                                     |
| --------------- | ----------------------------------------------------- | --------------------------------------------------------------------------- |
| **`storage`**   | Go (Chi, Fiber, Gin, Echo)                            | Local/cloud file indexing, high-speed I/O and streams.                      |
| **`mail`**      | Elixir (Phoenix, Absinthe)                            | Concurrent IMAP/SMTP connections, real-time webhooks and GraphQL.           |
| **`finance`**   | Java / Kotlin (Spring Boot, Micronaut, Quarkus)       | Transactional processing, precision calculations and Open Finance.          |
| **`career`**    | Node.js / Deno / Bun (NestJS, Fastify, tRPC, Express) | Job scraping, integration with Wails (Go) engine and application workflows. |
| **`ai-engine`** | Python (FastAPI, Django, Flask)                       | AI agent, receipt OCR, statistical models and LLM routing.                  |

### 2. Frontend & Mobile Clients

* **Web Executive Dashboard:** React (Next.js, Remix) / Vue.js (Nuxt.js, Vite) organized as micro-frontends.
* **Quick Tools & Extensions:** Svelte (SvelteKit).
* **Desktop App:** Tauri (Rust + Angular)
* **Mobile Multiplatform:** Flutter or Kotlin Multiplatform (KMP).

### 3. Machine Learning & Artificial Intelligence

* **Local & Cloud Models:** Ollama, llama.cpp, OpenAI API, Anthropic Claude API, Cohere.
* **Frameworks & Processing:** PyTorch, TensorFlow, Scikit-learn, Keras, Hugging Face Transformers.
* **Computer Vision & Analysis:** OpenCV, Pandas, NumPy, Matplotlib, Seaborn.

### 4. Databases & Messaging

* **Databases:** PostgreSQL, MySQL, MongoDB, Redis, SQLite.
* **Event Brokers:** Apache Kafka, RabbitMQ.

### 5. DevOps, Security & Observability

* **DevOps & Cloud:** Docker, Terraform, Ansible, Traefik, Nginx, Certbot, Let's Encrypt (AWS, GCP, Azure, DigitalOcean).
* **Security & Encryption:** HashiCorp Vault for secrets/API key management and AES-256 encryption at rest.
* **Observability:** OpenTelemetry, Jaeger, Prometheus, Grafana.

## 📁 Monorepo Structure

```text
tourmaline/
├── .github/
│   └── workflows/          # CI/CD Pipelines for each service
├── apps/
│   ├── web/                # Next.js / Nuxt.js Dashboards
│   ├── desktop/            # Wails + Go Desktop App
│   └── mobile/             # Flutter / React Native App
├── services/
│   ├── storage/            # Go File Aggregator Service
│   ├── mail/               # Elixir Mail Ingestion Service
│   ├── finance/            # Java/Kotlin Financial Service
│   ├── career/             # Node/Bun Career & Application Service
│   └── ai-engine/          # Python AI & Machine Learning Service
├── packages/               # Shared Schemas, DTOs and Configurations
├── infra/
│   ├── docker/             # Docker Compose for local environment
│   ├── terraform/          # Infrastructure Provisioning
│   ├── ansible/            # Automation Playbooks
│   └── vault/              # Secrets policies and configurations
├── docs/                   # API specifications, gRPC contracts and ADRs
└── README.md
```

## 🔒 Security, Multi-Tenancy & Privacy

1. **Data Isolation (Multi-Tenant):** All database schemas and Redis namespaces strictly filter data by user ID (`tenant_id`).
2. **Secrets Management:** OAuth tokens (Google Drive, Email) and banking credentials are stored encrypted and accessed via HashiCorp Vault.
3. **LLM Privacy:** The system prioritizes local models via Ollama/llama.cpp for sensitive data (statements and emails), using external providers only when authorized by the user.

## 🗺️ Initial Development Roadmap

* [ ] **Phase 1 — Infrastructure & Build Foundation:** Monorepo setup with **Bazel**, base Docker Compose, Vault, Traefik, and OpenTelemetry instrumentation.
* [ ] **Phase 2 — Core Services (Email & Files):** Implementation of `mail` (Elixir) and `storage` (Go) with messaging (Kafka/RabbitMQ).
* [ ] **Phase 3 — Web Interface & File/Email Management:** Building the web frontend interface for direct consumption and management of the email and file modules.
* [ ] **Phase 4 — AI Engine & Routing:** Creation of `ai-engine` (Python/FastAPI) with support for Ollama and external APIs.
* [ ] **Phase 5 — Career Module:** Implementation of the `career` module and integration with the local résumé engine in Wails/Go.
* [ ] **Phase 6 — Financial Module:** Creation of `finance` (Spring Boot/Kotlin) with statement ingestion and OCR via OpenCV.
* [ ] **Phase 7 — Desktop Client:** Development of the desktop client (Tauri + Angular) with notification support and integration with the services.
* [ ] **Phase 8 — Mobile Client:** Development of the mobile client (Flutter/KMP) with push notification support and integration with the services.
* [ ] **Phase 9 — Observability & Telemetry:** Implementation of monitoring dashboards and alerts via Grafana/Prometheus.
* [ ] **Phase 10 — Security & Compliance:** Security review, code audit, and compliance with privacy standards (GDPR, LGPD).
* [ ] **Phase 11 — Continuous Improvement & Refactoring:** Continuous cycle of improvements, refactorings, and addition of new features based on feedback and real needs.
