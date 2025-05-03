# E-Commerce Prototype

A mock storefront built with Next.js (App Router), PostgreSQL (via Prisma), Stripe for payments, and Docker. This project demonstrates:

- Full-stack application setup with Next.js and Prisma  
- PostgreSQL database containerized via Docker  
- Database schema migrations and seeding  
- Product listing and client-side shopping cart  
- Stripe Checkout integration (test mode)  
- App Router structure with server and client components  

---

## Table of Contents

1. [Tech Stack](#tech-stack)  
2. [Features](#features)  
3. [Prerequisites](#prerequisites)  
4. [Local Setup](#local-setup)  
5. [Environment Variables](#environment-variables)  
6. [Docker Setup](#docker-setup)  
7. [Database Migrations & Seeding](#database-migrations--seeding)  
8. [Running the App](#running-the-app)  
9. [Project Structure](#project-structure)  
10. [Scripts](#scripts)  
11. [Deployment](#deployment)  
12. [Contributing](#contributing)  
13. [License](#license)  

---

## Tech Stack
- **Frontend & Backend:** Next.js (App Router)  
- **Database ORM:** Prisma  
- **Database:** PostgreSQL (in Docker)  
- **Payments:** Stripe Checkout (test mode)  
- **Styling:** Plain CSS (with globals) and inline component styles  
- **Containerization:** Docker & Docker Compose (optional)  

---

## Features

- **Product Catalog:** Server-side fetching of products via Prisma  
- **Shopping Cart:** Client-side state managed with React Context  
- **Checkout Flow:** Stripe Checkout integration with hosted payment pages  
- **Success & Cancel Pages:** Feedback after payment  
- **Database Management:** Migrations, schema, and seed script  

---

## Prerequisites

- Node.js v16+ and npm  
- Docker & Docker Desktop  
- (Optional) Docker Compose  
- Stripe account for test API keys  

---

## Local Setup

1. **Clone this repository**  
   ```bash
   git clone git@github.com:Mtar786/ecommerce-project.git
   cd ecommerce-project

cp .env.example .env.local
Edit .env.local (see Environment Variables)

Environment Variables
Create a .env.local file with the following keys:

# Database connection (Postgres)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ecommerce?schema=public"

# Stripe (test keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE

# App URL for redirects
NEXT_PUBLIC_APP_URL=http://localhost:3000
Note: Do not commit .env.local to version control.

Docker Setup
Option A: Manual Postgres Container
bash

# Start Postgres in Docker
docker run --name ecommerce-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=postgres \
  -p 5432:5432 \
  -d postgres

# Create the ecommerce database
docker exec -it ecommerce-db psql -U postgres -c "CREATE DATABASE ecommerce;"
Option B: Docker Compose

services:
  db:
    image: postgres:13
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: ecommerce
    ports:
      - "5432:5432"
    volumes:
      - db-data:/var/lib/postgresql/data

  web:
    build: .
    environment:
      DATABASE_URL: postgres://postgres:postgres@db:5432/ecommerce
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: ${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      STRIPE_SECRET_KEY: ${STRIPE_SECRET_KEY}
    ports:
      - "3000:3000"
    depends_on:
      - db

volumes:
  db-data:

docker-compose up -d
Database Migrations & Seeding
Generate & Apply Migrations

npx prisma migrate dev --name init
Seed the Database

npm run seed
Running the App

npm run dev
Open your browser at http://localhost:3000 to view the storefront.

Project Structure
text
Copy
Edit
├─ prisma/               # Prisma schema & migrations
│  ├─ migrations/        # Auto-generated migrations
│  └─ seed.js            # Database seeding script
│
├─ public/               # Static assets (e.g., images)
│  └─ images/
│     ├─ hat.jpg
│     ├─ hoodie.jpg
│     └─ tshirt.jpg
│
├─ src/
│  ├─ app/               # Next.js App Router
│  │  ├─ api/            # Route Handlers
│  │  │  └─ create-checkout-session/route.ts
│  │  ├─ cart/           # Cart page
│  │  ├─ checkout/       # Checkout page
│  │  ├─ cancel/         # Payment canceled page
│  │  ├─ success/        # Payment success page
│  │  ├─ page.tsx        # Home page with product listing
│  │  └─ layout.tsx      # Global layout & CartProvider
│  │
│  └─ context/           # React Context for cart state
│     └─ CartContext.tsx
│
├─ .env.example          # Example env file (copy to .env.local)
├─ next.config.js
├─ package.json
└─ README.md
Scripts
npm run dev — Start development server

npm run build — Build for production

npm start — Start production server

npm run seed — Seed the database

npm run lint — Run linting checks

Deployment
Build

npm run build
Start

npm start
For production, consider:

Deploying the web app to Vercel (supports Next.js App Router natively)

Hosting Postgres on a managed provider (e.g., DigitalOcean, AWS RDS)

Setting environment variables in your hosting panel

Contributing
Contributions are welcome! Please open an issue or submit a pull request.

License
This project is licensed under the MIT License. Feel free to use and adapt.

