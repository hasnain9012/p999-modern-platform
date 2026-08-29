# P999 Modern Platform — Phase 2

GitLab-ready Next.js frontend + Neon PostgreSQL + Prisma CMS foundation.

## Stack

- Next.js 16 / React 19 / TypeScript
- Neon PostgreSQL
- Prisma ORM 7
- Prisma Neon driver adapter
- JWT-style signed HTTP-only admin cookie
- bcrypt password hashing
- Responsive Phase 1 UI
- Phase 2 database-backed games/categories CMS

Prisma's current Neon guidance recommends a pooled Neon connection for runtime traffic and a direct connection for Prisma CLI operations/migrations. This project therefore uses `DATABASE_URL` for the runtime and `DIRECT_URL` for Prisma CLI. See the official Prisma Neon documentation: https://docs.prisma.io/docs/orm/v6/overview/databases/neon

## 1. Create Neon database

In Neon, create a PostgreSQL project/database. Copy both connection strings:

- pooled connection -> `DATABASE_URL`
- direct connection -> `DIRECT_URL`

Put them in `.env` using `.env.example` as the template.

## 2. Configure admin

Set:

```env
ADMIN_NAME="Site Admin"
ADMIN_EMAIL="your-admin-email@example.com"
ADMIN_PASSWORD="use-a-long-random-password"
AUTH_SECRET="use-a-long-random-secret"
```

Do not commit `.env`.

## 3. Install

```bash
npm install
```

## 4. Create the Neon tables

```bash
npm run db:migrate -- --name init
```

Then seed:

```bash
npm run db:seed
```

Or for an existing migration workflow:

```bash
npm run db:deploy
npm run db:seed
```

## 5. Test database

```bash
npm run db:test
```

Expected output is similar to:

```json
{
  "connected": true,
  "categories": 8,
  "games": 12,
  "users": 1
}
```

## 6. Run

```bash
npm run dev
```

Public site: `http://localhost:3000`
CMS login: `http://localhost:3000/admin/login`

## Phase 2 features implemented

### Database

- User/admin accounts
- Roles
- Categories
- Games
- Game SEO
- Publish status
- Hot/featured flags
- Sort ordering
- JSON game features

### CMS

- Admin login
- Signed HTTP-only admin cookie
- Dashboard statistics
- Game listing
- Game search
- Add game
- Edit game
- Delete game
- Category management view
- Game SEO fields

### API

```text
POST   /api/admin/login
POST   /api/admin/logout
GET    /api/admin/games
POST   /api/admin/games
PATCH  /api/admin/games/:id
DELETE /api/admin/games/:id
GET    /api/admin/categories
POST   /api/admin/categories
PATCH  /api/admin/categories/:id
DELETE /api/admin/categories/:id
```

## Next Phase

The next CMS iteration should add:

- Rich text editor
- Media library / uploads
- Homepage section builder
- Page management
- Global SEO settings
- Redirect manager
- XML sitemap controls
- User/role management UI
- Audit logs
- Bulk import/export
- Image optimization pipeline
- Download/file storage integration

## GitLab deployment

Push the repository to GitLab. Add these CI/CD variables in GitLab:

```text
DATABASE_URL
DIRECT_URL
NEXT_PUBLIC_SITE_URL
AUTH_SECRET
ADMIN_NAME
ADMIN_EMAIL
ADMIN_PASSWORD
```

The existing `.gitlab-ci.yml` can build the application. For production deployment, use your chosen Node/Next.js host or a Docker/Node runner.
