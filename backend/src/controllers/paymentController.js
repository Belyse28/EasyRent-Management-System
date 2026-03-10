const db = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    let query = `
      SELECT pay.*, t.name as tenant_name, p.name as property_name, u.name as landlord_name
      FROM payments pay
      LEFT JOIN tenants t ON pay.tenant_id = t.id
      LEFT JOIN properties p ON pay.property_id = p.id
      LEFT JOIN users u ON pay.landlord_id = u.id
    `;
    let params = [];
    
    if (req.user.role === 'landlord') {
      query += ' WHERE pay.landlord_id = ?';
      params = [req.user.id];
    }
    
    const [payments] = await db.query(query, params);
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { tenant_id, property_id, amount, date } = req.body;
    const landlord_id = req.user.role === 'admin' ? req.body.landlord_id : req.user.id;
    
    const [result] = await db.query(
      'INSERT INTO payments (tenant_id, property_id, amount, date, landlord_id) VALUES (?, ?, ?, ?, ?)',
      [tenant_id, property_id, amount, date, landlord_id]
    );
    
    res.status(201).json({ message: 'Payment created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenant_id, property_id, amount, date } = req.body;
    
    await db.query(
      'UPDATE payments SET tenant_id = ?, property_id = ?, amount = ?, date = ? WHERE id = ?',
      [tenant_id, property_id, amount, date, id]
    );
    
    res.json({ message: 'Payment updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM payments WHERE id = ?', [id]);
    res.json({ message: 'Payment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
