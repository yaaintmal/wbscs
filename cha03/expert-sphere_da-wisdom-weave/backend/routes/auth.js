// routes/auth.js
const express = require('express'); // Importiert Express
const router = express.Router(); // Erstellt einen neuen Router
const User = require('../models/User'); // Importiert das User-Modell
const jwt = require('jsonwebtoken'); // Importiert jsonwebtoken
require('dotenv').config(); // Lädt Umgebungsvariablen

// Hilfsfunktion zum Generieren eines JWT-Tokens
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token läuft nach 1 Stunde ab
    });
};

// @route   POST /api/auth/register
// @desc    Einen neuen Benutzer registrieren
// @access  Öffentlich
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body; // Holt Benutzername, E-Mail und Passwort aus dem Anfragekörper

    try {
        // Prüft, ob Benutzer bereits existiert
        let user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(400).json({ message: 'Benutzername oder E-Mail ist bereits registriert' });
        }

        // Erstellt einen neuen Benutzer
        user = await User.create({
            username,
            email,
            password,
        });

        // Sendet eine Erfolgsmeldung und den generierten Token
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error(error); // Loggt den Fehler
        res.status(500).json({ message: 'Serverfehler' }); // Sendet Serverfehler
    }
});

// @route   POST /api/auth/login
// @desc    Benutzer einloggen
// @access  Öffentlich
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Holt E-Mail und Passwort aus dem Anfragekörper

    try {
        // Sucht den Benutzer anhand der E-Mail
        const user = await User.findOne({ email });

        // Prüft, ob Benutzer existiert und das Passwort übereinstimmt
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id), // Sendet den generierten Token
            });
        } else {
            res.status(401).json({ message: 'Ungültige E-Mail oder Passwort' }); // Sendet Fehlermeldung
        }
    } catch (error) {
        console.error(error); // Loggt den Fehler
        res.status(500).json({ message: 'Serverfehler' }); // Sendet Serverfehler
    }
});

module.exports = router; // Exportiert den Router
