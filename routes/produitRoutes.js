// routes/produitRoutes.js
const express = require('express');
const router = express.Router();
const {
    listerProduits,
    obtenirParCantonEtNom,
    creerProduit,
    mettreAJourProduit,
    supprimerProduit
} = require('../controllers/produitController');

const validateEnumParams = require('../middlewares/validateEnumParams');

// 1. Route pour lister tous les produits (avec filtres optionnels)
router.get('/', listerProduits);

// 2. Route ciblée (Canton + Produit) avec notre middleware de validation insensible à la casse
router.get('/canton/:canton/produit/:nom', validateEnumParams, obtenirParCantonEtNom);

// 3. Route pour ajouter un produit
router.post('/', creerProduit);

// 4. Route pour modifier un produit via son ID
router.put('/:id', mettreAJourProduit);

// 5. Route pour supprimer un produit via son ID
router.delete('/:id', supprimerProduit);

module.exports = router;