// models/Produit.js
const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, 'Le nom du produit est obligatoire'],
      enum: {
        values: ['Maïs', 'Mil', 'Sorgho'],
        message: "{VALUE} n'est pas un produit reconnu",
      },
      trim: true,
    },
    canton: {
      type: String,
      required: [true, 'Le canton est obligatoire'],
      enum: {
        values: ['Mororo', 'Guinglaye', 'Balda'],
        message: "{VALUE} n'est pas un canton reconnu",
      },
      trim: true,
    },
    prixUnitaire: {
      type: Number,
      required: [true, 'Le prix unitaire est obligatoire'],
      min: [0, 'Le prix ne peut pas être négatif'],
    },
    unite: {
      type: String,
      enum: ['kg', 'sac de 100kg', 'tonne'],
      default: 'kg',
    },
    quantiteDisponible: {
      type: Number,
      required: [true, 'La quantité disponible est obligatoire'],
      min: [0, 'La quantité ne peut pas être négative'],
      default: 0,
    },
    devise: { 
      type: String, 
      default: 'XAF' 
    },
    disponible: { 
      type: Boolean, 
      default: true 
    },
  },
  { timestamps: true } // Ajoute automatiquement createdAt et updatedAt
);

// Index composé unique pour éviter les doublons (ex: un seul Maïs à Mororo)
produitSchema.index({ canton: 1, nom: 1 }, { unique: true });

module.exports = mongoose.model('Produit', produitSchema);