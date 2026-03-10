const db = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    let query = `
      SELECT br.*, p.name as property_name, u.name as tenant_name 
      FROM booking_requests br
      JOIN properties p ON br.property_id = p.id
      JOIN users u ON br.tenant_id = u.id
    `;
    let params = [];
    
    if (req.user.role === 'tenant') {
      query += ' WHERE br.tenant_id = ?';
      params = [req.user.id];
    } else if (req.user.role === 'landlord') {
      query += ' WHERE p.owner_id = ?';
      params = [req.user.id];
    }
    
    const [bookings] = await db.query(query, params);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { property_id } = req.body;
    const tenant_id = req.user.id;
    
    const [result] = await db.query(
      'INSERT INTO booking_requests (property_id, tenant_id) VALUES (?, ?)',
      [property_id, tenant_id]
    );
    
    res.status(201).json({ message: 'Booking request created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    await db.query('UPDATE booking_requests SET status = ? WHERE id = ?', [status, id]);
    
    if (status === 'Approved') {
      const [booking] = await db.query('SELECT property_id FROM booking_requests WHERE id = ?', [id]);
      await db.query('UPDATE properties SET status = ? WHERE id = ?', ['Occupied', booking[0].property_id]);
    }
    
    res.json({ message: 'Booking status updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
