// server.js
const express = require('express'); // Importiert Express
const dotenv = require('dotenv'); // Importiert dotenv zum Laden von Umgebungsvariablen
const connectDB = require('./config/db'); // Importiert die Datenbankverbindungsfunktion
const cors = require('cors'); // Importiert cors für Cross-Origin-Requests
const authRoutes = require('./routes/auth'); // Importiert die Authentifizierungsrouten
const profileRoutes = require('./routes/profile'); // Importiert die Profilrouten

dotenv.config(); // Lädt Umgebungsvariablen aus der .env-Datei

// Dummy-Funktion für die Datenbankverbindung (später ersetzen)
// config/db.js ist nicht direkt in dieser Antwort enthalten, aber hier ist ein Beispiel dafür,
// wie es aussehen würde. Du müsstest eine 'config'-Ordner mit einer 'db.js'-Datei erstellen.
const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Optional: Wenn du ältere Mongoose-Versionen verwendest, könnten diese Optionen nötig sein
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true, // Oder use_unified_topology: true oder useFindAndModify: false
        });
        console.log(`MongoDB verbunden: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Fehler bei der MongoDB-Verbindung: ${error.message}`);
        process.exit(1); // Beendet den Prozess bei Verbindungsfehler
    }
};

// Ruft die Datenbankverbindung auf
connectToMongoDB();

const app = express(); // Erstellt eine Express-Anwendung

// Middleware
app.use(cors()); // Aktiviert CORS für alle Anfragen
app.use(express.json()); // Ermöglicht das Parsen von JSON im Anfragekörper

// Routen
app.use('/api/auth', authRoutes); // Authentifizierungsrouten unter /api/auth
app.use('/api/profile', profileRoutes); // Profilrouten unter /api/profile

// Basisroute
app.get('/', (req, res) => {
    res.send('API läuft...'); // Bestätigung, dass die API läuft
});

// Starten des Servers
const PORT = process.env.BACKEND_PORT || 5601; // Holt den Port aus den Umgebungsvariablen oder verwendet 5601

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`); // Bestätigung des Serverstarts
});
