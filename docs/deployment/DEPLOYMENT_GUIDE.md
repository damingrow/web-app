# D-AminGrow — Local Development & Cloudflare Deployment Guide
**Document Ref:** DAG-OPS-001  
**Version:** 1.0.0  
**Date:** 2026-10-26  
**Auditor:** Infrastructure & DevOps Lead  
**Status:** Approved  

---

## 1. Prerequisites & Tooling

Before setting up D-AminGrow locally or deploying to Cloudflare Workers, ensure the following tools are installed:
- **Node.js:** v20.x or v22.x LTS (compatible with v26.x)
- **Package Manager:** `npm` v10+
- **Supabase CLI:** `v1.190.0+` (`brew install supabase/tap/supabase` or `npm install -g supabase`)
- **Cloudflare Wrangler CLI:** `v3.111.0+` (included in `devDependencies`)
- **Git:** Version control

---

## 2. Local Development Workflow

### Step 1: Environment Setup
```bash
# Clone and enter directory
cd /Users/mac/Projects/Damingrow

# Copy environment template
cp .env.example .env.local
```
Fill in `.env.local` with your Supabase development credentials:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=+2348139169402
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

### Step 2: Install Dependencies & Run Development Server
```bash
# Install dependencies
npm install

# Start local Next.js development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 3: Run Baseline Quality Checks
```bash
# Type check TypeScript codebase
npm run type-check

# Execute unit and integration tests
npm test

# Run ESLint validation
npm run lint
```

---

## 3. Database Schema Migrations (Supabase)

### Apply Schema to Supabase Instance:
```bash
# Login to Supabase CLI
supabase login

# Link local repository to remote Supabase project
supabase link --project-ref <your-supabase-project-id>

# Push migrations to remote database
supabase db push
```

### Manual SQL Migration Execution (Supabase Web Dashboard):
If using the Supabase Web UI:
1. Open your project in the Supabase Dashboard.
2. Navigate to the **SQL Editor**.
3. Copy and execute [`supabase/migrations/20261026000001_initial_schema.sql`](file:///Users/mac/Projects/Damingrow/supabase/migrations/20261026000001_initial_schema.sql).
4. Copy and execute [`supabase/migrations/20261026000002_row_level_security.sql`](file:///Users/mac/Projects/Damingrow/supabase/migrations/20261026000002_row_level_security.sql).

---

## 4. Cloudflare Workers Edge Preview & Production Deployment

### Local Edge Preview (Wrangler + OpenNext):
```bash
# 1. Build the application for Cloudflare Workers
npm run build:cloudflare

# 2. Run local Cloudflare Worker preview with Wrangler
npm run preview
```

### Production Deployment to Cloudflare:
```bash
# 1. Authenticate with Cloudflare
npx wrangler login

# 2. Add required production secrets to Cloudflare Workers
npx wrangler secret put NEXT_PUBLIC_SUPABASE_URL
npx wrangler secret put NEXT_PUBLIC_SUPABASE_ANON_KEY
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY

# 3. Deploy Worker and Workers Static Assets
npm run deploy
```

---

## 5. Rollback Procedures

### Application Rollback (Cloudflare Workers):
Cloudflare Workers maintains instant versioning for every deployment:
1. Open the Cloudflare Dashboard $\rightarrow$ **Workers & Pages** $\rightarrow$ `damingrow`.
2. Navigate to the **Deployments** tab.
3. Select the previous stable deployment and click **Rollback to this version**. Rollback occurs in $<5$ seconds globally.

### Database Rollback (PostgreSQL):
If an emergency database rollback is required:
1. Verify that destructive changes will not orphan customer inquiries.
2. Execute [`supabase/migrations/20261026000001_initial_schema_rollback.sql`](file:///Users/mac/Projects/Damingrow/supabase/migrations/20261026000001_initial_schema_rollback.sql).
