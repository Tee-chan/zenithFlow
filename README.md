<!-- # zenithFlow

A high-performance B2B SaaS backend built with NestJS, Prisma, and PostgreSQL, implementing a multi-tenant shared-schema architecture. It is engineered to solve the complex problem of multi-tenant data isolation and state-dependent business workflows in an HR context. The system allows multiple companies (tenants) to manage their workforce, departments, and leave policies on a shared infrastructure with a "Zero-Trust" data access approach.

---

## Features

- **Multitenancy**: Row-level tenant isolation — every database query is automatically scoped to the authenticated company using AsyncLocalStorage and Prisma extensions.
- **Auth & RBAC**: Secure JWT-based authentication featuring four granular roles: SUPER_ADMIN, HR_ADMIN, MANAGER, and EMPLOYEE.
- **Company onboarding**:  Atomic registration workflow that creates a company profile and the primary SUPER_ADMIN account in a single transaction.
- **Employee management**:  Lifecycle management including inviting, onboarding, transferring between departments, and offboarding.
- **Department management**: Hierarchical org structures with manager assignments and nested department views.
- **Leave workflow**: A strict state-machine driven process for submitting, approving, rejecting, and cancelling leave requests.
- **Leave balances**:  Real-time balance tracking per employee and leave type; approved requests automatically deduct from allocated days.
- **Audit log**:  Immutable trails for every status change — recording the "Who, What, and When" for compliance.
- **Pagination & filtering**: Standardized query handling across all list endpoints supporting page, limit, and multi-field filtering.
- **Rate limiting**: Brute-force protection on authentication and sensitive onboarding endpoints.
- **Input validation**: Strict DTO validation and data sanitization using class-validator and Zod logic
- **Swagger docs**: Fully interactive API documentation and testing interface available at /api.
- **Dockerised**: Complete development environment orchestration with a single docker-compose command.

---

## Prerequisites

- Node.js v20+
- Docker and Docker Compose
- npm or yarn

---

## Setup

**1. Clone the repository**
```bash
git clone <your-repo-url>
cd zenith-flow
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=3000
DATABASE_URL=postgres://worknest:secret@localhost:5432/zenith_flow?schema=public"
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRES_IN=7d
```

**4. Spin up the environment**
```bash
docker-compose up -d
```

**5. Run migrations and seed**
```bash
npm prisma migrate dev
npm run seed
```

**6. Start the application**
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```
---

 ## Architectural Highlights
 
 **Multi-Tenant Isolation Logic**: ZenithFlow uses a Shared Schema approach. To prevent "Data Leaks," the system implements a Tenant Middleware that extracts the tenantId from the request and stores it in an AsyncLocalStorage context. The Prisma Client is then extended to inject a mandatory where: { tenantId } clause into every read/write operation automatically.
 
 **Leave State Machine**: The leave management system isn't just a status update; it’s a controlled flow. A request cannot move from PENDING to CANCELLED without following defined transitions, ensuring data integrity and preventing logical errors in HR records.

---

## API Documentation

Once the server is running, 
visit http://localhost:3000/api to explore the interactive Swagger documentation.

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | NestJS | Modular, TypeScript-first, DI built-in |
| Language | TypeScript | Type safety, better DX |
| Database | PostgreSQL | Relational data, ACID transactions, strong for multi-tenant |
| ORM | TypeORM | First-class NestJS integration, migration support |
| Auth | JWT + Passport | Stateless, scalable, embeds tenant context |
| Docs | Swagger (@nestjs/swagger) | Auto-generated, interactive |
| Containerisation | Docker + Compose | Reproducible dev environment |
---

## Author

Tenshi — [GitHub](https://github.com/Tee-chan) · [LinkedIn](https://linkedin.com/in/georgeangel1)

---

## License

MIT -->