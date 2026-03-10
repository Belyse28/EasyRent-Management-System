const db = require('../config/database');

exports.getAll = async (req, res) => {
  try {
    let query = `
      SELECT p.*, u.name as owner_name, u.username as owner_username
      FROM properties p
      LEFT JOIN users u ON p.owner_id = u.id
    `;
    let params = [];
    
    if (req.user.role === 'landlord') {
      query += ' WHERE p.owner_id = ?';
      params = [req.user.id];
    }
    
    const [properties] = await db.query(query, params);
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, address, rent } = req.body;
    const owner_id = req.user.role === 'admin' ? req.body.owner_id : req.user.id;
    const image = req.file ? `/uploads/properties/${req.file.filename}` : null;
    
    const [result] = await db.query(
      'INSERT INTO properties (name, address, rent, image, owner_id) VALUES (?, ?, ?, ?, ?)',
      [name, address, rent, image, owner_id]
    );
    
    res.status(201).json({ message: 'Property created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, rent, status } = req.body;
    const image = req.file ? `/uploads/properties/${req.file.filename}` : req.body.image;
    
    await db.query(
      'UPDATE properties SET name = ?, address = ?, rent = ?, image = ?, status = ? WHERE id = ?',
      [name, address, rent, image, status, id]
    );
    
    res.json({ message: 'Property updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM properties WHERE id = ?', [id]);
    res.json({ message: 'Property deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
