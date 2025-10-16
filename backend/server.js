const http = require('http');
const Database = require('better-sqlite3');
const url = require('url');

const db = new Database(__dirname + '/data/school.db');

function sendJSON(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(body);
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => (raw += chunk));
    req.on('end', () => {
      try { resolve(raw ? JSON.parse(raw) : {}); }
      catch (e) { reject(e); }
    });
  });
}

const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  const parsed = url.parse(req.url, true);
  const path = parsed.pathname;

  // GET /students -> list all
  if (req.method === 'GET' && path === '/students') {
    const rows = db.prepare('SELECT id, name, city, enrolled FROM students').all();
    return sendJSON(res, 200, rows);
  }

  // GET /students/:id
  if (req.method === 'GET' && path.startsWith('/students/')) {
    const id = Number(path.split('/')[2]);
    const row = db.prepare('SELECT id, name, city, enrolled FROM students WHERE id = ?').get(id);
    if (!row) return sendJSON(res, 404, { error: 'Not found' });
    return sendJSON(res, 200, row);
  }

  // POST /students  { name, city, enrolled }
  if (req.method === 'POST' && path === '/students') {
    try {
      const body = await parseBody(req);
      if (!body.name) return sendJSON(res, 400, { error: 'name required' });
      const stmt = db.prepare('INSERT INTO students (name, city, enrolled) VALUES (?, ?, ?)');
      const info = stmt.run(body.name, body.city || null, body.enrolled ? 1 : 0);
      const created = db.prepare('SELECT id, name, city, enrolled FROM students WHERE id = ?').get(info.lastInsertRowid);
      return sendJSON(res, 201, created);
    } catch (e) {
      return sendJSON(res, 400, { error: 'Invalid JSON' });
    }
  }

  // Default 404
  sendJSON(res, 404, { error: 'Route not found' });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
