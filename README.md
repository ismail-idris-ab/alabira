# Alabira Global Farm

Full-stack web presence for Alabira Global Farm — an organic farming operation based in Plateau State, Nigeria.

**Stack:** React 18 + Vite + Tailwind CSS v4 (client) · Node.js + Express + MongoDB (server)

---

## Quick Start

### Prerequisites

- Node.js ≥ 18
- MongoDB (local or Atlas URI)

### Install all dependencies

```bash
npm run install:all
```

### Environment variables

Create `server/.env`:

```env
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/alabira
JWT_ACCESS_SECRET=<random-secret>
JWT_REFRESH_SECRET=<random-secret>
RESEND_API_KEY=<your-resend-key>
FROM_EMAIL=Alabira Global Farm <noreply@alabiraglobalfarm.com>
ADMIN_EMAIL=hello@alabiraglobalfarm.com
CLIENT_ORIGIN=http://localhost:5173
NODE_ENV=development
```

Create `client/.env` (optional — Vite proxies `/api` to `localhost:5001` in dev):

```env
VITE_API_BASE_URL=/api
```

### Run in development (both client + server)

```bash
npm run dev
```

- Client: http://localhost:5173
- Server: http://localhost:5001

### Run separately

```bash
# Client only
npm run dev --prefix client

# Server only
npm run dev --prefix server
```

---

## Seed the database

```bash
npm run seed --prefix server
```

---

## Tests

```bash
npm test
```

Runs all server-side Jest tests with an in-memory MongoDB instance (no local MongoDB required).

---

## Project structure

```
├── client/              React + Vite frontend
│   ├── src/
│   │   ├── components/  UI components and page sections
│   │   ├── hooks/       useScrollReveal, useCountUp
│   │   ├── services/    Axios API client
│   │   ├── data/        Static fallback data
│   │   └── styles/      globals.css (Tailwind v4 @theme tokens)
│   └── public/images/   hero.webp, about.webp
│
└── server/              Express API
    ├── controllers/     Route handlers
    ├── models/          Mongoose schemas
    ├── routes/          Express routers
    ├── middleware/       Auth (JWT), rate limiter, error handler
    ├── utils/           Email service (Resend)
    └── tests/           Jest integration tests
```

---

## API endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/products` | — | List active products |
| GET | `/api/products?category=grains` | — | Filter by category |
| POST | `/api/products` | editor+ | Create product |
| PUT | `/api/products/:id` | editor+ | Update product |
| DELETE | `/api/products/:id` | superadmin | Delete product |
| GET | `/api/testimonials` | — | List approved testimonials |
| POST | `/api/testimonials` | editor+ | Create testimonial |
| POST | `/api/contact` | — | Submit contact form |
| POST | `/api/newsletter/subscribe` | — | Subscribe to newsletter |
| GET | `/api/newsletter/unsubscribe?token=` | — | Unsubscribe |
| POST | `/api/admin/login` | — | Admin login |
| POST | `/api/admin/refresh` | — | Refresh access token |
| POST | `/api/admin/logout` | — | Logout |

List endpoints return `{ data: [...] }`.

---

## Production build

```bash
npm run build
```

Outputs to `client/dist/`. Serve with any static host. Point `/api/*` to the Express server.
