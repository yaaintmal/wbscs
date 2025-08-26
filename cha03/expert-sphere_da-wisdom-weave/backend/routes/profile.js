// routes/profile.js
const express = require('express'); // Importiert Express
const router = express.Router(); // Erstellt einen neuen Router
const { protect } = require('../middleware/auth'); // Importiert die Authentifizierungs-Middleware
const User = require('../models/User'); // Importiert das User-Modell

// @route   GET /api/profile
// @desc    Benutzerprofil abrufen
// @access  Privat (geschützt durch Token)
router.get('/', protect, async (req, res) => {
    try {
        // Findet den Benutzer anhand der ID aus dem authentifizierten Token
        // Wir selektieren das Passwort nicht, um es nicht preiszugeben
        const user = await User.findById(req.user._id).select('-password');
        if (user) {
            res.json(user); // Sendet das Benutzerobjekt
        } else {
            res.status(404).json({ message: 'Benutzer nicht gefunden' }); // Benutzer nicht gefunden
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Serverfehler' });
    }
});

// @route   PUT /api/profile
// @desc    Benutzerprofil aktualisieren
// @access  Privat
router.put('/', protect, async (req, res) => {
    const { username, email, fullName } = req.body; // Holt Daten aus dem Anfragekörper

    try {
        const user = await User.findById(req.user._id); // Findet den Benutzer

        if (user) {
            // Aktualisiert die Benutzerdaten
            user.username = username || user.username;
            user.email = email || user.email;
            user.fullName = fullName !== undefined ? fullName : user.fullName; // Ermöglicht das Setzen auf einen leeren String

            const updatedUser = await user.save(); // Speichert die Änderungen

            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                fullName: updatedUser.fullName,
                skills: updatedUser.skills,
            });
        } else {
            res.status(404).json({ message: 'Benutzer nicht gefunden' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Serverfehler' });
    }
});

// @route   POST /api/profile/skills
// @desc    Kompetenz zum Benutzerprofil hinzufügen
// @access  Privat
router.post('/skills', protect, async (req, res) => {
    const { name, level } = req.body; // Holt Kompetenzname und Level

    try {
        const user = await User.findById(req.user._id);

        if (user) {
            // Fügt die neue Kompetenz zum skills-Array hinzu
            const newSkill = { name, level: level || 'Beginner' };
            user.skills.push(newSkill);
            await user.save();

            // Sendet das aktualisierte Array der Kompetenzen zurück
            res.status(201).json(user.skills);
        } else {
            res.status(404).json({ message: 'Benutzer nicht gefunden' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Serverfehler' });
    }
});

// @route   DELETE /api/profile/skills/:id
// @desc    Kompetenz aus dem Benutzerprofil entfernen
// @access  Privat
router.delete('/skills/:id', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            // Filtert die Kompetenz mit der gegebenen ID aus dem Array
            const initialLength = user.skills.length;
            user.skills = user.skills.filter(skill => skill._id.toString() !== req.params.id);

            if (user.skills.length < initialLength) {
                await user.save();
                res.json({ message: 'Kompetenz erfolgreich entfernt' });
            } else {
                res.status(404).json({ message: 'Kompetenz nicht gefunden' });
            }
        } else {
            res.status(404).json({ message: 'Benutzer nicht gefunden' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Serverfehler' });
    }
});

module.exports = router; // Exportiert den Router
