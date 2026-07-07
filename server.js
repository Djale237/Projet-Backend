const dns = require('dns'); dns.setDefaultResultOrder('ipv4first');
// server.js
require('dotenv').config(); // Toujours en première ligne
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connexion à la base de données
connectDB();

// Middleware pour parser le JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🚀 API COMDEKS4 opérationnelle');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Serveur démarré sur le port ${PORT}`);
});