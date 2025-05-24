const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// 🔗 Посилання на Apps Script
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbypy6fk9EYAcYgfUT-KAgEEkUt7zdd3_fsTTQQXRwGoNm9aY5qrnEy7Yf1DRwo4g2v8/exec";

// ✏️ Запис числа
app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'POST failed' });
  }
});

app.get('/last', async (req, res) => {
  try {
    const response = await fetch(SCRIPT_URL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'GET failed' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy listening on port ${PORT}`);
});
