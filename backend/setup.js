const bcrypt = require('bcryptjs');
const db = require('./src/config/database');

async function setupDatabase() {
  try {
    console.log('Setting up database...');
    
    // Hash passwords
    const adminPass = await bcrypt.hash('admin123', 10);
    const inesPass = await bcrypt.hash('ines123', 10);
    const landlord2Pass = await bcrypt.hash('land123', 10);
    const tenantPass = await bcrypt.hash('teana123', 10);
    
    // Insert users
    await db.query(`
      INSERT INTO users (username, password, name, role, email, contact) VALUES
      ('Belyse', ?, 'Belyse Umwali', 'admin', 'admin@rental.com', '1234567890'),
      ('Ines', ?, 'Ines Ihirwe', 'landlord', 'ines@rental.com', '1234567891'),
      ('landlord2', ?, 'Jane Owner', 'landlord', 'jane@rental.com', '1234567892'),
      ('Teana1', ?, 'Or Teana', 'tenant', 'teana@rental.com', '1234567893')
    `, [adminPass, inesPass, landlord2Pass, tenantPass]);
    
    // Insert properties
    await db.query(`
      INSERT INTO properties (name, address, rent, status, image, owner_id) VALUES
      ('Sunset Villa', '123 Main St', 1500.00, 'Available', 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400', 2),
      ('Ocean View Apt', '456 Beach Rd', 2000.00, 'Occupied', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400', 2),
      ('Downtown Loft', '789 City Ave', 1800.00, 'Available', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400', 3)
    `);
    
    // Insert tenant
    await db.query(`
      INSERT INTO tenants (name, email, contact, property_id, landlord_id) VALUES
      ('Alice Smith', 'alice@email.com', '1234567890', 2, 2)
    `);
    
    // Insert payment
    await db.query(`
      INSERT INTO payments (tenant_id, property_id, amount, date, landlord_id) VALUES
      (1, 2, 2000.00, '2024-01-15', 2)
    `);
    
    console.log('Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
