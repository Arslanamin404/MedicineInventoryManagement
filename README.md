# Medicine Inventory Management

A simple full-stack **Medicine Inventory Management System** built with
**Next.js (frontend)**, **Express + Prisma (backend)**, and a relational
database (PostgreSQL/MySQL).

## 🚀 Features

- Add, update, delete medicines/products\
- Track stock quantity and expiry date\
- View product details (generic name, manufacturer, pack size,
  category, etc.)\
- Simple and clean UI with Next.js + Tailwind\
- API built with Express & Prisma ORM

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, TailwindCSS\
- **Backend:** Express.js, Prisma ORM\
- **Database:** PostgreSQL (or MySQL)

## 📂 Project Structure

    medicine-inventory/
     ├── backend/      # Express + Prisma API
     ├── frontend/     # Next.js app
     ├── prisma/       # Prisma schema
     └── README.md

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/medicine-inventory.git
cd medicine-inventory
```

### 2. Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Setup Database

- Configure `.env` in `backend/` with your database URL\
- Run Prisma migrations:

```bash
npx prisma migrate dev
```

### 4. Run the project

Start backend:

```bash
cd backend
npm run dev
```

Start frontend:

```bash
cd frontend
npm run dev
```

Frontend will be available at `http://localhost:3000`
Backend API will run at `http://localhost:{PORRT}`
