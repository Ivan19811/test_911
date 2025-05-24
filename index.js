const express = require("express");
const cors = require("cors");
const { fetch } = require("undici");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Посилання на Apps Script
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbypy6fk9EYAcYgfUT-KAgEEkUt7zdd3_fsTTQQXRwGoNm9aY5qrnEy7Yf1DRwo4g2v8/exec";

// ✏️ Запис числа
app.post("/write", async (req, res) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: req.body.value })
    });

    const text = await response.text(); // ⬅️ Приймаємо текст
    const data = JSON.parse(text);     // ⬅️ Пробуємо вручну розпарсити
    res.json(data);
  } catch (err) {
    console.error("❌ Write proxy error:", err);
    res.status(500).json({ success: false, error: "Proxy write error", details: err.message });
  }
});

// 🔍 Отримання останнього значення
app.get("/last", async (req, res) => {
  try {
    const response = await fetch(SCRIPT_URL); // ⬅️ doGet викликається без тіла

    const text = await response.text();       // ⬅️ Приймаємо як текст
    const data = JSON.parse(text);            // ⬅️ Пробуємо вручну розпарсити
    res.json(data);
  } catch (err) {
    console.error("❌ Last proxy error:", err);
    res.status(500).json({ success: false, error: "Proxy last error", details: err.message });
  }
});

// ✅ ОБОВ’ЯЗКОВО для Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Proxy running on port ${PORT}`);
});
