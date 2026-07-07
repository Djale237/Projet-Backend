const mongoose = require('mongoose');
const Produit = require('../models/Produit'); 

const seedProduits = [
  {
    nom: "Semences de Maïs Composite",
    categorie: "Semences",
    prix: 1500,
    description: "Semences à haut rendement adaptées à la saison locale.",
    stock: 50
  },
  {
    nom: "Engrais Organique NPK",
    categorie: "Intrants",
    prix: 2500,
    description: "Engrais enrichi pour stimuler la croissance des cultures.",
    stock: 30
  }
];

const seedDB = async () => {
  try {
    // Utilise l'URI de ton fichier .env ou la base locale par défaut
    const dbUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/comdeks4_db';
    await mongoose.connect(dbUrl);
    console.log("📡 Connexion réussie pour le script de peuplement !");

    // Nettoyage et insertion
    await Produit.deleteMany({});
    await Produit.insertMany(seedProduits);
    console.log("🌱 Données initiales insérées avec succès !");
    
    await mongoose.connection.close();
    console.log("🔌 Connexion fermée proprement.");
  } catch (error) {
    console.error("❌ Erreur lors du peuplement :", error);
    process.exit(1);
  }
};

seedDB();