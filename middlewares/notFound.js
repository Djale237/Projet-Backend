// middlewares/notFound.js
const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        error: `Route non trouvée: ${req.originalUrl}`
    });
};

module.exports = notFound;