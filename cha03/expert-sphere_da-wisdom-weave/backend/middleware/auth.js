// middleware/auth.js
const jwt = require('jsonwebtoken'); // Importiert jsonwebtoken
const User = require('../models/User'); // Importiert das User-Modell
require('dotenv').config(); // Lädt Umgebungsvariablen aus .env

// Middleware-Funktion zur Authentifizierung von Benutzern
const protect = async (req, res, next) => {
    let token;

    // Prüft, ob ein Authorization-Header mit 'Bearer' vorhanden ist
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extrahiert den Token aus dem Header
            token = req.headers.authorization.split(' ')[1];

            // Überprüft und dekodiert den Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Findet den Benutzer anhand der ID im Token und hängt ihn an das Anfrageobjekt an
            // Wir selektieren das Passwort nicht, um es nicht preiszugeben
            req.user = await User.findById(decoded.id).select('-password');
            next(); // Geht zur nächsten Middleware-Funktion oder Route
        } catch (error) {
            console.error('Token-Fehler:', error); // Loggt den Fehler
            res.status(401).json({ message: 'Nicht autorisiert, Token fehlgeschlagen' }); // Sendet eine Fehlermeldung
        }
    }

    // Wenn kein Token vorhanden ist
    if (!token) {
        res.status(401).json({ message: 'Nicht autorisiert, kein Token' }); // Sendet eine Fehlermeldung
    }
};

module.exports = { protect }; // Exportiert die protect-Middleware
