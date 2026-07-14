// middlewares/validateEnumParams.js
const Produit = require('../models/Produit');

// Fonction utilitaire pour mettre la première lettre en majuscule (ex: "maïs" -> "Maïs")
const capitaliser = (texte) => {
    if (!texte) return '';
    return texte.charAt(0).toUpperCase() + texte.slice(1).toLowerCase();
};

// Les valeurs valides sont lues directement depuis le schéma Mongoose (Une seule source de vérité)
const CANTONS_VALIDES = Produit.schema.path('canton').enumValues;
const PRODUITS_VALIDES = Produit.schema.path('nom').enumValues;

const validateEnumParams = (req, res, next) => {
    // 1. On applique la transformation pour tolérer majuscules et minuscules
    if (req.params.canton) req.params.canton = capitaliser(req.params.canton);
    if (req.params.nom) req.params.nom = capitaliser(req.params.nom);

    const { canton, nom } = req.params;

    // 2. Vérification du canton
    if (!CANTONS_VALIDES.includes(canton)) {
        return res.status(400).json({
            success: false,
            error: `Canton invalide. Valeurs acceptées: ${CANTONS_VALIDES.join(', ')}`
        });
    }

    // 3. Vérification du produit
    if (!PRODUITS_VALIDES.includes(nom)) {
        return res.status(400).json({
            success: false,
            error: `Produit invalide. Valeurs acceptées: ${PRODUITS_VALIDES.join(', ')}`
        });
    }

    next();
};

module.exports = validateEnumParams;