# 💎 Tourmaline — Smart Personal Executive OS

**Tourmaline** é um ecossistema operacional pessoal distribuído, construído como um **playground de aprendizado contínuo ("projeto infinito")**. O objetivo do projeto é centralizar produtividade, gestão financeira, inteligência de comunicação, automação de carreira e gestão de arquivos em uma arquitetura moderna de microsserviços orientada a eventos.

---

## 🎯 Ideia Geral & Filosofia

O **Tourmaline** não é um produto com data final de entrega, mas sim um laboratório prático para estudo, refatoração constante, experimentação arquitetural e aplicação de engenharia de software em problemas reais do dia a dia.

### 📜 Regras do Projeto

1. **Uso Consciente de IA:** Ferramentas de IA são restritas à geração de boilerplate, revisão de código, documentação e sugestão de refatoração. O código final e a lógica de negócios devem ser escritos manualmente para garantir o aprendizado.
2. **Desenvolvimento Incremental:** O projeto evolui em etapas bem definidas, priorizando estabilidade e modularidade antes da expansão.
3. **Necessidades Reais:** Toda funcionalidade adicionada deve resolver uma dor real do dia a dia.
4. **Arquitetura Modular:** Baixo acoplamento e alta coesão. Novos serviços podem ser adicionados sem alterar o ecossistema existente.
5. **Open Source First:** Prioridade total para padrões, frameworks e bibliotecas abertas e gratuitas.
6. **Automação Estrita (CI/CD):** Todo microsserviço possui pipelines automatizados de testes, linting, build e validações de segurança no GitHub Actions antes de qualquer deploy.

---

## 🚀 Funcionalidades Principais

* 📁 **Agregador Universal de Arquivos (`tourmaline-storage`):** Indexação e acesso centralizado a múltiplos provedores em nuvem (Google Drive multi-conta) e sistemas de arquivos locais.
* 📧 **Cliente de E-mail Inteligente (`tourmaline-mail`):** Unificação de contas IMAP/SMTP com respostas inteligentes, sugestões inline, sumarização e categorização automática via IA.
* 🤖 **Assistente Pessoal Multimodal (`tourmaline-assistant`):** Processamento de voz e texto, gerenciamento de tarefas, lembretes, compromissos e roteamento inteligente de intenções.
* 💳 **Gestão Financeira Pessoal (`tourmaline-finance`):** Importação de extratos bancários/cartões, inteligência de investimentos, relatórios transacionais e análises preditivas de consumo.
* 💼 **Automação de Carreira e Vagas (`tourmaline-career`):** Scraping de vagas de emprego, filtragem inteligente por perfil, integração com o motor em Go/Wails para geração de currículos adaptados em PDF e envio automatizado de candidaturas.

---

## 🏛️ Arquitetura do Sistema

O projeto adota a estratégia de **Monorepo** para governança de código, mantendo microsserviços desacoplados e poliglotas.

```text
                               ┌───────────────────────────────────┐
                               │       Ingress & Security Layer    │
                               │   (Traefik / Nginx / HashiCorp)   │
                               └─────────────────┬─────────────────┘
                                                 │
 ┌───────────────────────────────────────────────┼───────────────────────────────────────────────┐
 │                                               │                                               │
 ▼                                               ▼                                               ▼
┌───────────────────────────┐       ┌───────────────────────────┐       ┌───────────────────────────┐
│     Frontends & Clients   │       │   Core Domain Services    │       │   AI & Analytics Engine   │
├───────────────────────────┤       ├───────────────────────────┤       ├───────────────────────────┤
│ • Web Engine (Next/Nuxt)  │       │ • Mail Sync (Elixir/Phx)  │       │ • ML & Vision Engine      │
│ • SvelteKit Micro-apps    │       │ • Finance (Spring/Quarkus)│       │  (FastAPI/PyTorch/OpenCV) │
│ • Desktop (Wails/Go)      │       │ • Career Sync (Node/Bun)  │       │ • LLM Router              │
│ • Mobile (Flutter/RN/KMP) │       │ • Storage Engine (Go)     │       │  (Ollama/llama.cpp/OpenAI)│
└─────────────┬─────────────┘       └─────────────┬─────────────┘       └─────────────┬─────────────┘
              │                                   │                                   │
              └───────────────────────────────────┼───────────────────────────────────┘
                                                  │
                                                  ▼
                            ┌───────────────────────────────────────────┐
                            │      Data & Observability Pipeline        │
                            ├───────────────────────────────────────────┤
                            │ • Message Brokers: Apache Kafka / RabbitMQ│
                            │ • Databases: Postgres, Mongo, Redis, DBs  │
                            │ • Telemetry: OTEL, Jaeger, Grafana, Prom  │
                            └───────────────────────────────────────────┘

```

---

## 🧰 Matriz de Tecnologias por Serviço

### 1. Backend Services

| Serviço                    | Tecnologias / Frameworks                              | Finalidade                                                                    |
| -------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------- |
| **`tourmaline-storage`**   | Go (Chi, Fiber, Gin, Echo)                            | Indexação de arquivos local/cloud, I/O de alta velocidade e streams.          |
| **`tourmaline-mail`**      | Elixir (Phoenix, Absinthe)                            | Conexões concorrentes IMAP/SMTP, webhooks em tempo real e GraphQL.            |
| **`tourmaline-finance`**   | Java / Kotlin (Spring Boot, Micronaut, Quarkus)       | Processamento transacional, cálculos de precisão e Open Finance.              |
| **`tourmaline-career`**    | Node.js / Deno / Bun (NestJS, Fastify, tRPC, Express) | Scraping de vagas, integração com motor Wails (Go) e workflows de aplicação.  |
| **`tourmaline-ai-engine`** | Python (FastAPI, Django, Flask)                       | Agente de IA, OCR de comprovantes, modelos estatísticos e roteamento de LLMs. |

### 2. Frontend & Mobile Clients

* **Web Executive Dashboard:** React (Next.js, Remix) / Vue.js (Nuxt.js, Vite) organizados em micro-frontends via Nx e Angular CLI.
* **Quick Tools & Extensions:** Svelte (SvelteKit).
* **Desktop App:** Wails (Go + HTML/JS/CSS).
* **Mobile Multiplatform:** Flutter, React Native e Kotlin Multiplatform (KMP).

### 3. Machine Learning & Inteligência Artificial

* **Modelos Locais & Cloud:** Ollama, llama.cpp, OpenAI API, Anthropic Claude API, Cohere.
* **Frameworks & Processamento:** PyTorch, TensorFlow, Scikit-learn, Keras, Hugging Face Transformers.
* **Visão Computacional & Análise:** OpenCV, Pandas, NumPy, Matplotlib, Seaborn.

### 4. Bancos de Dados & Mensageria

* **Bancos de Dados:** PostgreSQL, MySQL, MongoDB, Redis, SQLite.
* **Brokers de Eventos:** Apache Kafka, RabbitMQ.

### 5. DevOps, Segurança & Observabilidade

* **DevOps & Cloud:** Docker, Terraform, Ansible, Traefik, Nginx, Certbot, Let's Encrypt (AWS, GCP, Azure, DigitalOcean).
* **Segurança & Criptografia:** HashiCorp Vault para gestão de segredos/chaves de API e criptografia AES-256 em repouso.
* **Observabilidade:** OpenTelemetry, Jaeger, Prometheus, Grafana.

---

## 📁 Estrutura do Monorepo

```text
tourmaline/
├── .github/
│   └── workflows/          # CI/CD Pipelines para cada serviço
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
├── packages/               # Shared Schemas, DTOs e Configurações
├── infra/
│   ├── docker/             # Docker Compose para ambiente local
│   ├── terraform/          # Provisionamento de Infraestrutura
│   ├── ansible/            # Playbooks de automação
│   └── vault/              # Políticas e configurações de segredos
├── docs/                   # Especificações de APIs, contratos gRPC e ADRs
└── README.md

```

---

## 🔒 Segurança, Multi-Tenancy & Privacidade

1. **Isolamento de Dados (Multi-Tenant):** Todos os esquemas de banco de dados e namespaces no Redis filtram os dados estritamente por ID de usuário (`tenant_id`).
2. **Gerenciamento de Segredos:** Tokens OAuth (Google Drive, E-mail) e credenciais bancárias são armazenados criptografados e acessados via HashiCorp Vault.
3. **Privacidade em LLMs:** O sistema prioriza modelos locais via Ollama/llama.cpp para dados sensíveis (extratos e e-mails), usando provedores externos apenas quando autorizado pelo usuário.

---

## 🗺️ Roadmap de Desenvolvimento Inicial

* [ ] **Fase 1 — Fundação da Infraestrutura:** Configuração do Monorepo, Docker Compose base, Vault, Traefik e instrumentação OpenTelemetry.
* [ ] **Fase 2 — Engine de IA e Roteamento:** Construção do `tourmaline-ai-engine` (Python/FastAPI) com suporte a Ollama e APIs externas.
* [ ] **Fase 3 — Módulo de Carreira:** Implementação do `tourmaline-career` e integração com o motor local de currículos em Wails/Go.
* [ ] **Fase 4 — Módulo Financeiro:** Criação do `tourmaline-finance` (Spring Boot/Kotlin) com ingestão de extratos e OCR via OpenCV.
* [ ] **Fase 5 — E-mail & Arquivos Concorrentes:** Lançamento do `tourmaline-mail` (Elixir) e `tourmaline-storage` (Go) com mensageria via Kafka/RabbitMQ.
