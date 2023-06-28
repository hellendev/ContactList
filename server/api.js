const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3000;

// Configuração do banco de dados SQLite
const db = new sqlite3.Database(':memory:');

//using cors to allow any origin
app.use(cors({ origin: '*' }));

// Cria a tabela de contatos
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )`);
});

// Middleware para processar requisições JSON
app.use(express.json());

// Rota para listar todos os contatos
app.get('/contacts', (req, res) => {
  db.all('SELECT * FROM contacts', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

// Rota para obter um contato por ID
app.get('/contacts/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM contacts WHERE id = ?', id, (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  });
});

// Rota para adicionar um novo contato
app.post('/contacts', (req, res) => {
  const { name } = req.body;

  db.get('SELECT * FROM contacts WHERE LOWER(name) = LOWER(?)', name, (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (row) {
      // O contato já existe, retornar um erro ou uma mensagem informando a duplicação
      res.status(400).json({ error: 'Contact already exists' });
    } else {
      // O contato não existe, pode ser adicionado
      db.run('INSERT INTO contacts (name) VALUES (?)', name, function (err) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.json({ id: this.lastID });
        }
      });
    }
  });
});

// Rota para atualizar um contato existente
app.put('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  db.run('UPDATE contacts SET name = ? WHERE id = ?', name, id, function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (this.changes > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  });
});

// Rota para excluir um contato
app.delete('/contacts/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM contacts WHERE id = ?', id, function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (this.changes > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
