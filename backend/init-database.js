const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function initDatabase() {
  let connection;
  
  try {
    // Connect without database first
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });

    console.log('Connected to MySQL...');

    // Create database
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log('Database created/verified...');

    // Use the database
    await connection.query(`USE ${process.env.DB_NAME}`);

    // Create tables
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        role ENUM('admin', 'landlord', 'tenant') NOT NULL,
        email VARCHAR(100),
        contact VARCHAR(15),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS properties (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        address VARCHAR(255) NOT NULL,
        rent DECIMAL(10, 2) NOT NULL,
        status ENUM('Available', 'Occupied') DEFAULT 'Available',
        image VARCHAR(500),
        owner_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS tenants (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        contact VARCHAR(15) NOT NULL,
        property_id INT,
        landlord_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE SET NULL,
        FOREIGN KEY (landlord_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT PRIMARY KEY AUTO_INCREMENT,
        tenant_id INT NOT NULL,
        property_id INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        date DATE NOT NULL,
        landlord_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
        FOREIGN KEY (landlord_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS booking_requests (
        id INT PRIMARY KEY AUTO_INCREMENT,
        property_id INT NOT NULL,
        tenant_id INT NOT NULL,
        status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
        FOREIGN KEY (tenant_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('Tables created...');

    // Check if data already exists
    const [users] = await connection.query('SELECT COUNT(*) as count FROM users');
    if (users[0].count === 0) {
      // Insert users with plain text passwords
      await connection.query(`
        INSERT INTO users (username, password, name, role, email, contact) VALUES
        ('Belyse', 'admin123', 'Belyse Umwali', 'admin', 'admin@rental.com', '1234567890'),
        ('landlord1', 'ines123', 'Ines Ihirwe', 'landlord', 'ines@rental.com', '1234567891'),
        ('landlord2', 'land123', 'Jane Owner', 'landlord', 'jane@rental.com', '1234567892'),
        ('tenant1', 'tenant123', 'John Tenant', 'tenant', 'tenant@rental.com', '1234567893')
      `);

      // Insert properties
      await connection.query(`
        INSERT INTO properties (name, address, rent, status, image, owner_id) VALUES
        ('Sunset Villa', '123 Main St', 1500.00, 'Available', 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400', 2),
        ('Ocean View Apt', '456 Beach Rd', 2000.00, 'Occupied', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400', 2),
        ('Downtown Loft', '789 City Ave', 1800.00, 'Available', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400', 3)
      `);

      // Insert tenant
      await connection.query(`
        INSERT INTO tenants (name, email, contact, property_id, landlord_id) VALUES
        ('Alice Smith', 'alice@email.com', '1234567890', 2, 2)
      `);

      // Insert payment
      await connection.query(`
        INSERT INTO payments (tenant_id, property_id, amount, date, landlord_id) VALUES
        (1, 2, 2000.00, '2024-01-15', 2)
      `);

      console.log('Sample data inserted...');
    } else {
      console.log('Data already exists, skipping insert...');
    }

    console.log('✅ Database setup completed successfully!');
    console.log('\nYou can now login with:');
    console.log('Admin - username: admin, password: admin123');
    console.log('Landlord - username: landlord1, password: ines123');
    console.log('Tenant - username: tenant1, password: tenant123');

  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
  } finally {
    if (connection) await connection.end();
    process.exit();
  }
}

initDatabase();
