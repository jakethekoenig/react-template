import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

dotenv.config();

export const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());
app.locals.db = db;  // Store the database instance

// API routes
app.get('/api/notes', (req, res) => {
  const notes = app.locals.db.prepare('SELECT * FROM notes ORDER BY timestamp DESC').all();
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  const stmt = app.locals.db.prepare('INSERT INTO notes (content) VALUES (?)');
  const result = stmt.run(content);

  const newNote = app.locals.db.prepare('SELECT * FROM notes WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(newNote);
});

// Serve static files from the React app
const staticPath = path.join(__dirname, '../../client/dist');
const indexPath = path.join(__dirname, '../../client/dist/index.html');
app.use(express.static(staticPath));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  const targetPath = path.join(staticPath, req.path);
  if (!existsSync(indexPath) || !existsSync(targetPath)) {
    console.log('Resource not found at:', targetPath);
    return res.status(404).send('Not Found');
  }
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
