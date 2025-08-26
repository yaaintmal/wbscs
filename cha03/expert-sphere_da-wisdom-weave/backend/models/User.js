// models/User.js
const mongoose = require('mongoose'); // Importiert Mongoose zur Definition des Schemas
const bcrypt = require('bcryptjs'); // Importiert bcryptjs zum Hashen von Passwörtern

// Definiert das Schema für einen Benutzer
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // Benutzername ist erforderlich
        unique: true,   // Benutzername muss einzigartig sein
        trim: true      // Leerzeichen am Anfang und Ende entfernen
    },
    password: {
        type: String,
        required: true // Passwort ist erforderlich
    },
    email: {
        type: String,
        required: true, // E-Mail ist erforderlich
        unique: true,   // E-Mail muss einzigartig sein
        trim: true,
        lowercase: true // E-Mail in Kleinbuchstaben umwandeln
    },
    // Optional: Feld für den vollen Namen des Benutzers
    fullName: {
        type: String,
        default: '' // Standardwert ist ein leerer String
    },
    // Optional: Ein Array von Kompetenzen, die der Benutzer besitzt
    skills: [
        {
            name: {
                type: String,
                required: true, // Name der Kompetenz ist erforderlich
                trim: true
            },
            level: {
                type: String,
                enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], // Vordefinierte Werte
                default: 'Beginner' // Standardwert für das Level
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now // Datum der Erstellung des Benutzers
    }
});

// Middleware vor dem Speichern: Hashe das Passwort, wenn es geändert oder neu erstellt wird
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) { // Prüft, ob das Passwort geändert wurde
        next(); // Wenn nicht, fahre fort
    }
    const salt = await bcrypt.genSalt(10); // Generiert einen Salt
    this.password = await bcrypt.hash(this.password, salt); // Hashe das Passwort mit dem Salt
    next(); // Gehe zum nächsten Middleware
});

// Methode zum Vergleichen von Passwörtern
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // Vergleicht das eingegebene Passwort mit dem gehashten Passwort
};

module.exports = mongoose.model('User', UserSchema); // Exportiert das User-Modell
