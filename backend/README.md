# Backend API - Rental Property Management System

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure MySQL Database
1. Install MySQL 8.0
2. Create database:
```bash
mysql -u root -p < database/schema.sql
```

### 3. Configure Environment Variables
Edit `.env` file:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=rental_management
JWT_SECRET=your_secret_key
```

### 4. Create Default Users
Run this SQL to create users with hashed passwords:
```sql
-- Password: admin123
INSERT INTO users (username, password, name, role) VALUES 
('Belyse', '$2a$10$rQZ8vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ9vZ', 'Belyse Umwali', 'admin');
```

### 5. Start Server
```bash
npm run dev
```

Server runs on: http://localhost:3000

## API Endpoints

### Authentication
- POST `/api/auth/login` - Login
- POST `/api/auth/register` - Register tenant

### Properties
- GET `/api/properties` - Get all properties
- POST `/api/properties` - Create property
- PUT `/api/properties/:id` - Update property
- DELETE `/api/properties/:id` - Delete property

### Tenants
- GET `/api/tenants` - Get all tenants
- POST `/api/tenants` - Create tenant
- PUT `/api/tenants/:id` - Update tenant
- DELETE `/api/tenants/:id` - Delete tenant

### Payments
- GET `/api/payments` - Get all payments
- POST `/api/payments` - Create payment
- PUT `/api/payments/:id` - Update payment
- DELETE `/api/payments/:id` - Delete payment

### Bookings
- GET `/api/bookings` - Get all bookings
- POST `/api/bookings` - Create booking
- PUT `/api/bookings/:id/status` - Update booking status

## Authentication
All endpoints (except login/register) require JWT token in header:
```
Authorization: Bearer <token>
```
