import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Echo Between Us' });
});

// Serve static build in production
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(indexPath);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
