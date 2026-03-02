# Takhdam – Job Board for Morocco

A bilingual (French/Arabic) job board built with Next.js, Tailwind CSS, and Supabase.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy the example file and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Required variables:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database

### Seed

Inserts companies and jobs into a fresh database:

```bash
source .env.local && npm run seed
```

### Reseed

Clears all existing data (applications → jobs → companies), then re-inserts:

```bash
source .env.local && npm run reseed
```

## Stack

- [Next.js 16](https://nextjs.org) — App Router, React Server Components
- [Tailwind CSS v4](https://tailwindcss.com) — utility-first styling
- [Supabase](https://supabase.com) — Postgres, auth, storage
