const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // Change if your DB has a different password
  database: 'internship'
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
    return;
  }
  console.log('✅ MySQL connected');
});

// ✅ Get all departments
app.get('/departments', (req, res) => {
  db.query('SELECT * FROM departments', (err, results) => {
    if (err) {
      console.error('❌ Error fetching departments:', err);
      return res.status(500).json({ error: 'Failed to fetch departments', details: err.message });
    }
    res.json(results);
  });
});

// ✅ Get department by ID
app.get('/departments/:id', (req, res) => {
  db.query('SELECT * FROM departments WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      console.error('❌ Error fetching department by ID:', err);
      return res.status(500).json({ error: 'Failed to fetch department', details: err.message });
    }
    res.json(results[0]);
  });
});

// ✅ Add new department
app.post('/departments', (req, res) => {
  const { name, description } = req.body;
  console.log('🔽 Received data for INSERT:', req.body);

  if (!name || !description) {
    return res.status(400).json({ error: 'Missing name or description' });
  }

  const sql = 'INSERT INTO departments (name, description) VALUES (?, ?)';
  db.query(sql, [name, description], (err, result) => {
    if (err) {
      console.error('❌ MySQL insert error:', err);
      return res.status(500).json({ error: 'Database insert failed', details: err.message });
    }
    console.log('✅ Department added with ID:', result.insertId);
    res.json({ id: result.insertId });
  });
});

// ✅ Update department
app.put('/departments/:id', (req, res) => {
  const { name, description } = req.body;
  console.log(`✏️ Update department ID ${req.params.id} with data:`, req.body);

  const sql = 'UPDATE departments SET name = ?, description = ? WHERE id = ?';
  db.query(sql, [name, description, req.params.id], (err, result) => {
    if (err) {
      console.error('❌ Update failed:', err);
      return res.status(500).json({ error: 'Update failed', details: err.message });
    }
    res.json({ updated: true });
  });
});

// ✅ Delete department
app.delete('/departments/:id', (req, res) => {
  console.log(`🗑️ Delete request for department ID: ${req.params.id}`);

  db.query('DELETE FROM departments WHERE id = ?', [req.params.id], (err, result) => {
    if (err) {
      console.error('❌ Delete failed:', err);
      return res.status(500).json({ error: 'Delete failed', details: err.message });
    }
    res.json({ deleted: true });
  });
});

// Start backend
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend server running on port ${PORT}`));
