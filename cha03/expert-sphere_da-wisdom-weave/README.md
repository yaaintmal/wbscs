Backend (Node.js mit Express und MongoDB)

Dieses Backend ist für die Benutzerverwaltung (Registrierung, Login), Profilverwaltung und das Hinzufügen von Kompetenzen zuständig. Es verwendet MongoDB als Datenbank, Mongoose für die Interaktion mit MongoDB, bcryptjs für die sichere Passwortspeicherung und jsonwebtoken für die Benutzerauthentifizierung.

Bitte stelle sicher, dass du Node.js und npm (oder yarn) installiert hast.

1. Projektstruktur erstellen:

Erstelle einen neuen Ordner für dein Backend, z.B. backend, und navigiere in diesen Ordner.
Bash

mkdir backend
cd backend

2. Abhängigkeiten installieren:

Installiere die notwendigen npm-Pakete:
Bash

npm init -y
npm install express mongoose bcryptjs jsonwebtoken cors dotenv

3. Eine .env-Datei erstellen:

Lege im backend-Ordner eine Datei namens .env an. Diese Datei enthält sensible Informationen wie deine MongoDB-Verbindungs-URL und den geheimen Schlüssel für JWTs.

MONGO_URI=mongodb://localhost:27017/meinAppDB
JWT_SECRET=dein_sehr_geheimer_jwt_schluessel
BACKEND_PORT=5601

    MONGO_URI: Wenn deine MongoDB auf einem anderen Host oder Port läuft, musst du dies entsprechend anpassen. Standardmäßig läuft MongoDB auf Port 27017. meinAppDB ist der Name deiner Datenbank.

    JWT_SECRET: Ersetze dein_sehr_geheimer_jwt_schluessel durch eine lange, zufällige Zeichenkette.

    BACKEND_PORT: Der Port, auf dem dein Backend läuft (wie gewünscht, 5601).

4. Code-Dateien erstellen:

Erstelle die folgenden Ordner und Dateien im backend-Verzeichnis:

backend/
├── .env
├── package.json
├── server.js
├── models/
│   └── User.js
├── routes/
│   ├── auth.js
│   └── profile.js
└── middleware/
    └── auth.js

5. models/User.js (Benutzer-Schema)

Dies definiert das Datenmodell für deine Benutzer in MongoDB.

User Model (backend)
14. Aug., 21:10

6. middleware/auth.js (Authentifizierungs-Middleware)

Diese Middleware überprüft den JWT-Token im Header der Anfrage, um geschützte Routen zu sichern.
Auth Middleware (backend)
14. Aug., 21:10

7. routes/auth.js (Authentifizierungs-Routen)

Diese Datei enthält die Routen für die Benutzerregistrierung und das Login.
Auth Routes (backend)
14. Aug., 21:10

8. routes/profile.js (Profil-Routen)

Diese Datei enthält Routen zum Abrufen und Aktualisieren des Benutzerprofils sowie zum Verwalten von Kompetenzen.
Profile Routes (backend)
14. Aug., 21:10

9. server.js (Hauptserver-Datei)

Dies ist der Einstiegspunkt für dein Backend.
Main Server File (backend)
14. Aug., 21:10

10. MongoDB installieren und starten

Du musst eine MongoDB-Instanz lokal installieren und starten.

    Für Windows/macOS: Lade das MongoDB Community Server-Installationsprogramm von der offiziellen MongoDB-Website herunter und folge den Anweisungen.

    Für Linux (Ubuntu/Debian):
    Bash

    sudo apt-get install mongodb
    sudo systemctl start mongodb
    sudo systemctl enable mongodb

Stelle sicher, dass MongoDB auf dem Standardport (27017) läuft oder passe MONGO_URI in deiner .env-Datei an.

11. Backend starten:

Navigiere im Terminal zum backend-Ordner und starte den Server:
Bash

node server.js

Du solltest Meldungen sehen wie "MongoDB verbunden..." und "Server läuft auf Port 5601".

Frontend (React-Anwendung)

Dieses Frontend bietet die Benutzeroberfläche für Registrierung, Login und die Profilverwaltung. Es wird auf Port 5600 laufen.

1. Projektstruktur erstellen:

Erstelle einen neuen Ordner für dein Frontend, z.B. frontend, und navigiere in diesen Ordner.
Bash

mkdir frontend
cd frontend

2. React-Anwendung erstellen:

Erstelle eine neue React-Anwendung mit Vite (modern und schnell):
Bash

npm create vite@latest . -- --template react

Während der Installation wirst du gefragt:

    Project name: . (für den aktuellen Ordner)

    Select a framework: React

    Select a variant: JavaScript (oder TypeScript, wenn du das bevorzugst)

Danach installiere die Abhängigkeiten:
Bash

npm install
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p

3. Tailwind CSS konfigurieren:

Öffne tailwind.config.js und konfiguriere die content-Sektion:
JavaScript

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

Öffne src/index.css und füge die Tailwind-Direktiven hinzu:
CSS

/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Optional: Eine Standard-Schriftart setzen */
body {
  font-family: 'Inter', sans-serif;
}

4. src/App.jsx (Hauptkomponente der Anwendung)

Dies ist die zentrale React-Komponente, die die gesamte Anwendungslogik und das Rendering enthält.
Main React App (frontend)
14. Aug., 21:10

5. Frontend starten:

Navigiere im Terminal zum frontend-Ordner und starte die Entwicklungsserver:
Bash

npm run dev

Dein React-Frontend sollte jetzt auf http://localhost:5600 verfügbar sein.

So funktioniert's und nächste Schritte:

    Backend auf 5601: Dein Backend-Server läuft auf http://localhost:5601. Es empfängt API-Anfragen von deinem Frontend.

    Frontend auf 5600: Deine React-App läuft auf http://localhost:5600. Sie ist die Benutzeroberfläche, die mit dem Backend kommuniziert.

    MongoDB: Die Anwendung erwartet, dass eine MongoDB-Instanz auf mongodb://localhost:27017 läuft. Stelle sicher, dass du MongoDB installiert und gestartet hast, bevor du das Backend startest.

    Benutzerauthentifizierung:

        Benutzer können sich auf der App registrieren (Benutzername, E-Mail, Passwort).

        Nach der Registrierung können sie sich mit E-Mail und Passwort anmelden.

        Beim Login und der Registrierung erhält der Benutzer einen JSON Web Token (JWT), der im lokalen Speicher des Browsers (localStorage) gespeichert wird.

        Dieser Token wird dann für alle geschützten Anfragen (z.B. Profil abrufen, bearbeiten, Kompetenzen hinzufügen/löschen) an das Backend gesendet, um den Benutzer zu authentifizieren.

    Profil- und Kompetenzverwaltung: Nach dem Login kann der Benutzer sein Profil bearbeiten (Benutzername, E-Mail, voller Name) und Kompetenzen mit einem bestimmten Level hinzufügen oder vorhandene Kompetenzen löschen.

Dieses Setup ermöglicht dir, die gesamte Anwendung lokal zu entwickeln und zu testen, ohne auf externe Dienste wie Firebase angewiesen zu sein.
