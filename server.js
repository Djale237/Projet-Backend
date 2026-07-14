// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const produitRoutes = require('./routes/produitRoutes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

// 1. Connexion à la base de données (MongoDB Atlas ou Local Memory Server)
connectDB();

const app = express();

// 2. Middleware pour analyser le corps des requêtes en JSON
app.use(express.json());

// 3. Montage des routes de l'API sous le préfixe /api/produits
app.use('/api/produits', produitRoutes);

// 4. Middlewares de gestion de fin de chaîne (DOIVENT être déclarés en dernier)
app.use(notFound);       // Gère les URLs inconnues
app.use(errorHandler);   // Centralise et formate toutes les erreurs du serveur

// 5. Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré avec succès sur le port ${PORT}`);
});