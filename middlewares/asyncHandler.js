// middlewares/asyncHandler.js
// Enveloppe les fonctions asynchrones pour transférer automatiquement les erreurs au middleware central
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;