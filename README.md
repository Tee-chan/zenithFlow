 # zenithFlow

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

### Setup
1. **Clone & Install**
   ```bash
   git clone https://github.com/
   cd zenith-flow
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Ensure DATABASE_URL is set correctly for your terminal
   ```

3. **Spin up Infrastructure**
   ```bash
   docker-compose up -d
   ```

4. **Database Initialization (Prisma 7)**
   ```bash
   # Generate the client
   npx prisma generate
   
   # Run migrations to sync the schema
   npx prisma migrate dev --name init_schema

   #optional: seed initial data
   npm run seed
   ```

5. **Start the Application**
   ```bash
   npm run start:dev
  
   ```
---

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
| Database | PostgreSQL 16 | Relational data, Row-level seurity, ACID transactions, strong for multi-tenant |
| ORM | Prisma 7 (with driver Adapters)| type-safe query extensions to automate tenant isolation |
| Cache/Queue |Redis | Handle asynchronous background jobs(Queues), Distributed locking and Performance(caching). |
| Auth | JWT + Passport | Stateless, scalable, embeds tenant context |
| Docs | Swagger (@nestjs/swagger) | Auto-generated, interactive |
| Containerisation | Docker + Compose | Reproducible dev environment |
---

## Author

Tenshi — [GitHub](https://github.com/Tee-chan) · [LinkedIn](https://linkedin.com/in/georgeangel1)

---

## License

MIT