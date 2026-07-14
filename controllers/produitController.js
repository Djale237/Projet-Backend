// controllers/produitController.js
const Produit = require('../models/Produit');
const asyncHandler = require('../middlewares/asyncHandler');

// @desc    Lister tous les produits (avec filtres optionnels ?canton= et ?nom=)
// @route   GET /api/produits
exports.listerProduits = asyncHandler(async (req, res) => {
    const filtre = {};
    if (req.query.canton) filtre.canton = req.query.canton;
    if (req.query.nom) filtre.nom = req.query.nom;

    const produits = await Produit.find(filtre).sort({ canton: 1, nom: 1 });

    res.json({
        success: true,
        count: produits.length,
        data: produits
    });
});

// @desc    Obtenir un produit spécifique dans un canton (Route ciblée USSD / IA)
// @route   GET /api/produits/canton/:canton/produit/:nom
exports.obtenirParCantonEtNom = asyncHandler(async (req, res) => {
    const { canton, nom } = req.params;
    
    const produit = await Produit.findOne({ canton, nom });

    if (!produit) {
        return res.status(404).json({
            success: false,
            error: `Aucune donnée trouvée pour ${nom} à ${canton}`
        });
    }

    res.json({
        success: true,
        data: produit
    });
});

// @desc    Créer un nouveau produit
// @route   POST /api/produits
exports.creerProduit = asyncHandler(async (req, res) => {
    const produit = await Produit.create(req.body);
    res.status(201).json({
        success: true,
        data: produit
    });
});

// @desc    Mettre à jour un produit par son ID
// @route   PUT /api/produits/:id
exports.mettreAJourProduit = asyncHandler(async (req, res) => {
    const produit = await Produit.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Renvoie le document mis à jour
        runValidators: true // Réapplique les validations du schéma Mongoose
    });

    if (!produit) {
        return res.status(404).json({
            success: false,
            error: 'Produit introuvable'
        });
    }

    res.json({
        success: true,
        data: produit
    });
});

// @desc    Supprimer un produit par son ID
// @route   DELETE /api/produits/:id
exports.supprimerProduit = asyncHandler(async (req, res) => {
    const produit = await Produit.findByIdAndDelete(req.params.id);

    if (!produit) {
        return res.status(404).json({
            success: false,
            error: 'Produit introuvable'
        });
    }

    res.json({
        success: true,
        data: {}
    });
});