# CompetencyHub - SaaS MVP Business Plan

## 📋 Executive Summary

**Product Name:** CompetencyHub  
**Version:** MVP Lite 1.0  
**Target:** Multi-tenant SaaS Competency & Skills Management Platform  
**Infrastructure:** AWS/Azure Single Server with Multi-Tenant Architecture

---

## 🎯 MVP Scope - Lite Version Features

### Phase 1: Core Foundation (Day 1 - TODAY)

| Module | Features | Priority |
|--------|----------|----------|
| **Tenant Management** | Multi-tenant architecture, tenant isolation, tenant settings | 🔴 Critical |
| **Authentication** | Login, logout, password reset, JWT tokens | 🔴 Critical |
| **Organization Structure** | Departments, Positions, Titles, Employees | 🔴 Critical |
| **Competency Definitions** | Create/Edit/Delete competencies, descriptions | 🔴 Critical |
| **Competency Groups** | Grouping competencies by category | 🟡 High |
| **Skill Matrix** | Visual competency-employee matrix view | 🔴 Critical |
| **Evaluation Entry** | Target & actual value entry for competencies | 🔴 Critical |
| **Periodic Evaluation** | Save evaluation results by period | 🟡 High |
| **Archive** | Historical evaluation data storage | 🟡 High |
| **Basic Reporting** | Export to Excel, competency dashboards | 🟡 High |

---

## 🏗️ Technical Architecture

### Multi-Tenant Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    LOAD BALANCER                            │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                  APPLICATION SERVER                          │
│  ┌─────────────────────────────────────────────────────┐    │
│  │               Next.js / Node.js                      │    │
│  │         (API Routes + React Frontend)                │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                      DATABASE                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              PostgreSQL / MongoDB                    │    │
│  │        (Schema-per-tenant isolation)                 │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Database Schema Design (Multi-Tenant)

```sql
-- Tenant Table (Master)
tenants (
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    subdomain VARCHAR(100) UNIQUE,
    plan_type VARCHAR(50), -- 'lite', 'professional', 'enterprise'
    max_employees INT,
    is_active BOOLEAN,
    created_at TIMESTAMP,
    settings JSONB
)

-- All other tables include tenant_id for isolation
-- Example: employees
employees (
    id UUID PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(id),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    department_id UUID,
    position_id UUID,
    title_id UUID,
    manager_id UUID,
    job_start_date DATE,
    is_active BOOLEAN,
    created_at TIMESTAMP
)
```

---

## 📊 Data Model - MVP Entities

### Core Entities

1. **Tenants** - Organization accounts
2. **Users** - System users with roles
3. **Departments** - Organizational units
4. **Positions** - Job positions
5. **Titles** - Employee titles
6. **Employees** - Personnel records
7. **Competency Groups** - Skill categories
8. **Competencies** - Individual skills
9. **Grading Scales** - Evaluation levels (1-5, A-F, etc.)
10. **Skill Matrices** - Competency tables
11. **Evaluation Periods** - Assessment timeframes
12. **Employee Competency Values** - Actual evaluations
13. **Evaluation Archives** - Historical records

---

## 🖥️ UI/UX Design Guidelines

### Color Palette

```css
:root {
  /* Primary Blue Gradient */
  --primary-start: #1e3a8a;    /* Deep Blue */
  --primary-mid: #3b82f6;       /* Bright Blue */
  --primary-end: #60a5fa;       /* Light Blue */
  
  /* Accents */
  --accent-cyan: #22d3ee;
  --accent-purple: #a78bfa;
  
  /* Backgrounds */
  --bg-dark: #0f172a;
  --bg-card: rgba(30, 41, 59, 0.8);
  --bg-glass: rgba(255, 255, 255, 0.05);
  
  /* Text */
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
}
```

### Typography
- **Headings:** Plus Jakarta Sans (Bold)
- **Body:** Inter (Regular)
- **Monospace:** JetBrains Mono (for data)

### Design Principles
1. **Gradient Headers** - Blue gradient waves in headers
2. **Glassmorphism** - Frosted glass effect for cards
3. **Subtle Animations** - Micro-interactions on hover
4. **Data-Dense Layouts** - Efficient use of screen real estate
5. **Dark Mode First** - Professional, modern feel

---

## 🚀 MVP Development Phases

### TODAY - MVP Core Build

| Time | Task | Deliverable |
|------|------|-------------|
| 0-2h | Project Setup | Next.js + TypeScript + Tailwind |
| 2-4h | Database & Auth | Prisma + NextAuth + Tenant setup |
| 4-6h | Organization Module | Dept/Position/Title/Employee CRUD |
| 6-8h | Competency Module | Groups & Competency definitions |
| 8-10h | Skill Matrix | Interactive matrix view |
| 10-12h | Evaluation Module | Target/Actual entry + Periods |
| 12-14h | Reporting | Dashboard + Excel export |
| 14-16h | Polish & Deploy | UI refinement + Docker setup |

---

## 💰 Pricing Strategy (Future)

| Plan | Price/mo | Employees | Features |
|------|----------|-----------|----------|
| **Lite** | $29 | Up to 25 | Core features |
| **Professional** | $79 | Up to 100 | + Training management |
| **Enterprise** | $199 | Unlimited | + API + Custom reports |

---

## 🔐 Security Considerations

1. **Tenant Isolation** - Row-level security in database
2. **JWT Tokens** - Secure authentication
3. **HTTPS Only** - TLS encryption
4. **Password Hashing** - bcrypt with salt
5. **Rate Limiting** - API abuse prevention
6. **Audit Logging** - Action tracking

---

## 📁 Project Structure

```
competency-hub/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth pages
│   │   ├── (dashboard)/       # Protected pages
│   │   ├── api/               # API routes
│   │   └── layout.tsx
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components
│   │   ├── forms/            # Form components
│   │   ├── tables/           # Data tables
│   │   └── charts/           # Visualization
│   ├── lib/                   # Utilities
│   │   ├── db/               # Database client
│   │   ├── auth/             # Auth utilities
│   │   └── utils/            # Helpers
│   ├── types/                 # TypeScript types
│   └── styles/               # Global styles
├── prisma/                    # Database schema
├── public/                    # Static assets
├── docker/                    # Docker configs
└── docs/                      # Documentation
```

---

## ✅ Success Metrics

1. **Functional MVP** - All core features working
2. **Multi-Tenant** - Complete data isolation
3. **Performance** - Page load < 2s
4. **Mobile Responsive** - Works on all devices
5. **Export Capability** - Excel reports functional

---

## 🎬 Let's Build!

Starting with the React application structure and working through each module systematically. The focus is on delivering a polished, professional MVP that demonstrates the core value proposition of competency management.
