// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // 1. Erreur de validation Mongoose (champs requis, min, enum...)
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({ success: false, error: messages });
    }

    // 2. Identifiant ID MongoDB mal formé (ex: /api/produits/abc123)
    if (err.name === 'CastError') {
        return res.status(400).json({ success: false, error: 'Identifiant invalide' });
    }

    // 3. Doublon de clé (Violation de l'index unique canton + produit)
    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            error: 'Une entrée existe déjà pour ce canton et ce produit'
        });
    }

    // 4. Erreur générale du serveur
    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Erreur interne du serveur'
    });
};

module.exports = errorHandler;