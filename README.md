# 🏆 CompetencyHub - SaaS Competency Management Platform

A modern, multi-tenant SaaS application for managing employee competencies and skills matrices.

![CompetencyHub Dashboard](docs/screenshots/dashboard.png)

## ✨ Features

### MVP Lite Version
- **🏢 Organization Management**
  - Departments with hierarchy
  - Positions & Titles
  - Employee records with full profiles

- **🎯 Competency Framework**
  - Competency definitions with groups
  - Customizable grading scales (1-5)
  - Target value settings

- **📊 Skill Matrix**
  - Interactive competency-employee matrix
  - Visual heatmap representation
  - Real-time editing

- **📝 Evaluation System**
  - Periodic evaluation periods (Monthly/Quarterly/Annual)
  - Target vs Actual tracking
  - Historical archive

- **📈 Reporting**
  - Gap analysis
  - Department overviews
  - Excel export

## 🏗️ Architecture

### Multi-Tenant Design
```
┌─────────────────────────────────────────┐
│           Load Balancer                 │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Next.js Application             │
│    (API Routes + React Frontend)        │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│            PostgreSQL                   │
│     (Row-level tenant isolation)        │
└─────────────────────────────────────────┘
```

### Tech Stack
- **Frontend:** React 18 + Next.js 14 + TypeScript
- **Styling:** Tailwind CSS with custom design system
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** NextAuth.js with JWT
- **Charts:** Recharts
- **Deployment:** Docker + Docker Compose

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (or use Docker)

### Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-org/competencyhub.git
cd competencyhub
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your values
```

4. **Start database**
```bash
docker-compose up -d db
```

5. **Run migrations**
```bash
npx prisma db push
npx prisma generate
```

6. **Start development server**
```bash
npm run dev
```

7. **Open browser**
```
http://localhost:3000
```

### Docker Deployment

```bash
# Build and run all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

## 📁 Project Structure

```
competency-hub/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Protected dashboard pages
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
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
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                    # Static assets
├── docker/                    # Docker configs
└── docs/                      # Documentation
```

## 🎨 Design System

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#3b82f6` | Buttons, links, highlights |
| Dark Background | `#0f172a` | Main background |
| Card Background | `#1e293b` | Cards, panels |
| Text Primary | `#f1f5f9` | Main text |
| Text Secondary | `#94a3b8` | Muted text |
| Success | `#10b981` | Success states |
| Warning | `#f59e0b` | Warning states |
| Danger | `#ef4444` | Error states |

### Typography
- **Headings:** Plus Jakarta Sans (Bold)
- **Body:** Inter (Regular)
- **Monospace:** JetBrains Mono

## 🔐 Security

- **Tenant Isolation:** Row-level security with tenant_id
- **Authentication:** JWT tokens with refresh mechanism
- **Password:** bcrypt hashing with salt rounds
- **HTTPS:** TLS encryption in production
- **Rate Limiting:** API abuse prevention
- **Audit Logging:** Action tracking for compliance

## 📊 API Endpoints

### Organization
```
GET    /api/departments         # List departments
POST   /api/departments         # Create department
GET    /api/departments/:id     # Get department
PUT    /api/departments/:id     # Update department
DELETE /api/departments/:id     # Delete department

GET    /api/employees           # List employees
POST   /api/employees           # Create employee
...
```

### Competencies
```
GET    /api/competencies        # List competencies
POST   /api/competencies        # Create competency
GET    /api/competency-groups   # List groups
...
```

### Evaluation
```
GET    /api/evaluation-periods  # List periods
POST   /api/evaluations         # Submit evaluation
GET    /api/matrices/:id        # Get skill matrix
...
```

## 📋 Roadmap

### Phase 1 (MVP) ✅
- [x] Multi-tenant architecture
- [x] Organization structure
- [x] Competency definitions
- [x] Skill matrix view
- [x] Basic evaluation entry
- [x] Excel export

### Phase 2 (Professional)
- [ ] Training management
- [ ] Development plans
- [ ] Goal setting
- [ ] 360° feedback
- [ ] Mobile app

### Phase 3 (Enterprise)
- [ ] SSO integration
- [ ] Custom reports
- [ ] API access
- [ ] White-labeling
- [ ] Advanced analytics

## 💰 Pricing

| Plan | Price | Employees | Features |
|------|-------|-----------|----------|
| **Lite** | $29/mo | Up to 25 | Core features |
| **Professional** | $79/mo | Up to 100 | + Training |
| **Enterprise** | $199/mo | Unlimited | + API, SSO |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Pedavalans competency management system
- Built with Next.js, Tailwind CSS, and Prisma
- Icons by Lucide

---

**CompetencyHub** - Empowering organizations to develop their most valuable asset: their people.
