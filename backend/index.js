const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// ✅ Allowlisted Frontend Origins
const allowedOrigins = [
  'http://localhost:3000', // Local dev
  'https://hrm-system-production.up.railway.app', // Vercel frontend
];

// ✅ CORS Configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn('❌ Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// ✅ Middleware
app.use(express.json());

// ✅ MySQL connection
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DB || 'internship'
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
    process.exit(1);
  }
  console.log('✅ MySQL connected');
});

// ✅ Get all departments
app.get('/departments', (req, res) => {
  db.query('SELECT * FROM departments', (err, results) => {
    if (err) {
      console.error('❌ Error fetching departments:', err);
      return res.status(500).json({ error: 'Failed to fetch departments' });
    }
    res.json(results);
  });
});

// ✅ Get department by ID
app.get('/departments/:id', (req, res) => {
  db.query('SELECT * FROM departments WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      console.error('❌ Error fetching department by ID:', err);
      return res.status(500).json({ error: 'Failed to fetch department' });
    }
    res.json(results[0]);
  });
});

// ✅ Add department
app.post('/departments', (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Missing name or description' });
  }

  db.query('INSERT INTO departments (name, description) VALUES (?, ?)', [name, description], (err, result) => {
    if (err) {
      console.error('❌ MySQL insert error:', err);
      return res.status(500).json({ error: 'Insert failed' });
    }
    res.json({ id: result.insertId });
  });
});

// ✅ Update department
app.put('/departments/:id', (req, res) => {
  const { name, description } = req.body;

  db.query('UPDATE departments SET name = ?, description = ? WHERE id = ?', [name, description, req.params.id], (err) => {
    if (err) {
      console.error('❌ Update failed:', err);
      return res.status(500).json({ error: 'Update failed' });
    }
    res.json({ updated: true });
  });
});

// ✅ Delete department
app.delete('/departments/:id', (req, res) => {
  db.query('DELETE FROM departments WHERE id = ?', [req.params.id], (err) => {
    if (err) {
      console.error('❌ Delete failed:', err);
      return res.status(500).json({ error: 'Delete failed' });
    }
    res.json({ deleted: true });
  });
});

// ✅ Start Server (critical: bind to 0.0.0.0 on Railway)
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});
