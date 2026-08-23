// Servidor local mínim, només per previsualitzar index.html amb un origen
// http:// real (calen les capçaleres CORS de Google Sheets; un fitxer
// obert directament amb file:// no les rep). Sense dependències.
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PORT = process.env.PORT || 5510;

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.geojson': 'application/json',
  '.json': 'application/json',
  '.png': 'image/png',
  '.ttf': 'font/ttf'
};

http.createServer((req, res) => {
  let filePath = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (req.url === '/' || req.url === '') filePath = path.join(ROOT, 'index.html');
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => console.log('Dev server on http://localhost:' + PORT));
