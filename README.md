# Excellent WebWorld Admin Panel API - Setup Guide

## Quick Setup Commands

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env

# 3. Encrypt .env file
npx dotenvx encrypt

# 4. Create database
npx sequelize-cli db:create

# 5. Run migrations
npx sequelize-cli db:migrate

# 6. Run seeders (creates admin user)
npx sequelize-cli db:seed:all

# 7. Start development server
npm run dev
```

Server runs on: `http://localhost:5000`

## Internationalization
Add `Accept-Language: ar` header for Arabic responses.
