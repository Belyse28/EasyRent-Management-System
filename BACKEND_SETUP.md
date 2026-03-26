# Backend Setup Instructions

## Option 1: Run Current Frontend-Only App

Your current app works without a backend. Just run:

```bash
cd C:\Rental-Property-Management-System
npm run dev
```

Visit: http://localhost:5173

## Option 2: Add Backend API

### Step 1: Install Backend Dependencies

```bash
cd C:\Rental-Property-Management-System\backend
npm install
```

### Step 2: Start Backend Server

```bash
npm start
```

Backend will run on: http://localhost:3000

### Step 3: Update Frontend to Use Backend

You'll need to modify your frontend store to make API calls instead of using mock data.

### Step 4: Run Both Frontend and Backend

**Terminal 1 (Backend):**
```bash
cd C:\Rental-Property-Management-System\backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd C:\Rental-Property-Management-System
npm run dev
```

## API Endpoints

- `POST /api/auth/login` - User login
- `GET /api/properties` - Get properties
- `POST /api/properties` - Create property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property
- `GET /api/tenants` - Get tenants
- `POST /api/tenants` - Create tenant
- `PUT /api/tenants/:id` - Update tenant
- `DELETE /api/tenants/:id` - Delete tenant
- `GET /api/payments` - Get payments
- `POST /api/payments` - Create payment
- `PUT /api/payments/:id` - Update payment
- `DELETE /api/payments/:id` - Delete payment
- `GET /api/users` - Get users (admin only)
- `POST /api/users` - Create user (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

## Current Status

Your app currently works with **mock data** (no backend needed). If you want to add a real backend, follow Option 2 above.

## Recommendation

For your presentation, the current frontend-only version is sufficient and demonstrates all the features. Adding a backend is optional.