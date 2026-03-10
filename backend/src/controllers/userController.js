const db = require('../config/database');

exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query('SELECT id, username, password, name, role, email, contact FROM users');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, password, name, role, email, contact } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO users (username, password, name, role, email, contact) VALUES (?, ?, ?, ?, ?, ?)',
      [username, password, name, role, email, contact]
    );
    
    res.status(201).json({ message: 'User created successfully', id: result.insertId });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Username already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, name, role, email, contact } = req.body;
    
    await db.query(
      'UPDATE users SET username = ?, password = ?, name = ?, role = ?, email = ?, contact = ? WHERE id = ?',
      [username, password, name, role, email, contact, id]
    );
    
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Username already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
