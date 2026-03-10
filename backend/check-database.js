const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkDatabase() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('🔍 Checking database data...\n');

    // Check users
    const [users] = await connection.query('SELECT id, username, name, role FROM users');
    console.log('👥 USERS:');
    users.forEach(user => {
      console.log(`  ${user.id}: ${user.name} (${user.username}) - ${user.role}`);
    });

    // Check properties
    const [properties] = await connection.query('SELECT id, name, status, owner_id FROM properties');
    console.log('\n🏠 PROPERTIES:');
    properties.forEach(prop => {
      console.log(`  ${prop.id}: ${prop.name} - ${prop.status} (Owner: ${prop.owner_id})`);
    });

    // Check tenants
    const [tenants] = await connection.query('SELECT id, name, property_id, landlord_id FROM tenants');
    console.log('\n👤 TENANTS:');
    tenants.forEach(tenant => {
      console.log(`  ${tenant.id}: ${tenant.name} - Property: ${tenant.property_id}, Landlord: ${tenant.landlord_id}`);
    });

    // Check payments
    const [payments] = await connection.query('SELECT id, tenant_id, property_id, amount, landlord_id FROM payments');
    console.log('\n💰 PAYMENTS:');
    payments.forEach(payment => {
      console.log(`  ${payment.id}: ${payment.amount} RWF - Tenant: ${payment.tenant_id}, Property: ${payment.property_id}, Landlord: ${payment.landlord_id}`);
    });

    console.log('\n📊 SUMMARY:');
    console.log(`  Users: ${users.length}`);
    console.log(`  Properties: ${properties.length}`);
    console.log(`  Tenants: ${tenants.length}`);
    console.log(`  Payments: ${payments.length}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) await connection.end();
    process.exit();
  }
}

checkDatabase();