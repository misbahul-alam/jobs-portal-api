# 💼 Online Jobs Portal API

A robust, high-performance recruitment platform backend built with **Node.js**, **Fastify**, and **Drizzle ORM**. This project demonstrates enterprise-level architecture, including multi-role authentication, full-text search, and a modular service-oriented design.

![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Drizzle](https://img.shields.io/badge/drizzle-orm-blue?style=for-the-badge)

---

## 🏗️ Architecture & Tech Stack

This API is built using a **Modular Monolith** approach. Each feature is self-contained, making the system easy to scale or migrate to microservices.

- **Framework:** [Fastify](https://www.fastify.io/) (High-performance, low overhead)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/) (Type-safe, "headless" SQL)
- **Package Manager:** [pnpm](https://pnpm.io/) (Strict, fast, and disk-efficient)
- **Auth:** JWT-based Role-Based Access Control (RBAC)

---

## ✨ Key Features

- **Multi-Role System:** Separate logic for `Seekers` (applicants), `Employers` (job posters), and `Admins`.
- **Advanced Job Search:** Optimized filtering by salary, location, and skills using Postgres indexing.
- **Secure File Handling:** Managed resume uploads with metadata validation.
- **Automated Docs:** Interactive Swagger/OpenAPI UI available at `/docs`.
- **Type-Safe Development:** End-to-end type safety from the database schema to the API response.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js v22+
- pnpm installed (`npm i -g pnpm`)
- A running PostgreSQL instance

### 2. Installation
```bash
pnpm install