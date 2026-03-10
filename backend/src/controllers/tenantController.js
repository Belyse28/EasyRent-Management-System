const db = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    let query = `
      SELECT t.*, p.name as property_name, u.name as landlord_name
      FROM tenants t
      LEFT JOIN properties p ON t.property_id = p.id
      LEFT JOIN users u ON t.landlord_id = u.id
    `;
    let params = [];
    
    if (req.user.role === 'landlord') {
      query += ' WHERE t.landlord_id = ?';
      params = [req.user.id];
    }
    
    const [tenants] = await db.query(query, params);
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, email, contact, property_id } = req.body;
    const landlord_id = req.user.role === 'admin' ? req.body.landlord_id : req.user.id;
    
    const [result] = await db.query(
      'INSERT INTO tenants (name, email, contact, property_id, landlord_id) VALUES (?, ?, ?, ?, ?)',
      [name, email, contact, property_id, landlord_id]
    );
    
    await db.query('UPDATE properties SET status = ? WHERE id = ?', ['Occupied', property_id]);
    
    res.status(201).json({ message: 'Tenant created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, contact, property_id } = req.body;
    
    await db.query(
      'UPDATE tenants SET name = ?, email = ?, contact = ?, property_id = ? WHERE id = ?',
      [name, email, contact, property_id, id]
    );
    
    res.json({ message: 'Tenant updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [tenant] = await db.query('SELECT property_id FROM tenants WHERE id = ?', [id]);
    
    await db.query('DELETE FROM tenants WHERE id = ?', [id]);
    
    if (tenant[0]?.property_id) {
      await db.query('UPDATE properties SET status = ? WHERE id = ?', ['Available', tenant[0].property_id]);
    }
    
    res.json({ message: 'Tenant deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
