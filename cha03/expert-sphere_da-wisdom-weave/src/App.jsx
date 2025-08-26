// src/App.jsx
import React, { useState, useEffect } from 'react'; // Importiert React Hooks

// Hauptkomponente der Anwendung
const App = () => {
    // Zustand für den aktuellen Authentifizierungs-Token
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    // Zustand für die geladenen Benutzerdaten
    const [user, setUser] = useState(null);
    // Zustand, um anzuzeigen, ob Daten geladen werden
    const [loading, setLoading] = useState(true);
    // Zustand für Fehlermeldungen
    const [error, setError] = useState('');
    // Zustand für die Anzeige des aktuellen Formulars (Login oder Registrierung)
    const [isRegistering, setIsRegistering] = useState(false);
    // Zustand für die Anzeige von Benachrichtigungen (z.B. Erfolgsmeldungen)
    const [message, setMessage] = useState('');
    // Zustand für die neue Kompetenz, die hinzugefügt werden soll
    const [newSkill, setNewSkill] = useState({ name: '', level: 'Beginner' });
    // Zustand für die Bearbeitung des Profils
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    // Zustand für die temporären Profildaten während der Bearbeitung
    const [tempProfileData, setTempProfileData] = useState({});

    // Die Basis-URL für unser Backend
    const API_BASE_URL = 'http://localhost:5601/api';

    // Hook, der beim Laden der Komponente oder bei Token-Änderung ausgelöst wird
    useEffect(() => {
        // Wenn ein Token vorhanden ist, versuche das Benutzerprofil zu laden
        if (token) {
            fetchUserProfile();
        } else {
            setLoading(false); // Wenn kein Token, ist das Laden abgeschlossen
        }
    }, [token]); // Abhängigkeit: wird bei Token-Änderung ausgeführt

    // Funktion zum Anzeigen von Benachrichtigungen
    const showMessage = (msg, type = 'success') => {
        setMessage(msg);
        // Nachricht nach 3 Sekunden ausblenden
        setTimeout(() => setMessage(''), 3000);
    };

    // Funktion zum Abrufen des Benutzerprofils vom Backend
    const fetchUserProfile = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_BASE_URL}/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Token im Header senden
                },
            });

            if (!response.ok) {
                // Wenn die Antwort nicht OK ist, Token entfernen und ausloggen
                localStorage.removeItem('token');
                setToken('');
                throw new Error('Fehler beim Laden des Profils. Bitte erneut anmelden.');
            }

            const data = await response.json();
            setUser(data); // Benutzerdaten setzen
            setTempProfileData({ // Temporäre Daten für die Bearbeitung setzen
                username: data.username,
                email: data.email,
                fullName: data.fullName || ''
            });
        } catch (err) {
            setError(err.message);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Funktion für die Benutzerregistrierung
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registrierung fehlgeschlagen');
            }

            localStorage.setItem('token', data.token); // Token im lokalen Speicher speichern
            setToken(data.token);
            showMessage('Registrierung erfolgreich! Willkommen.', 'success');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Funktion für das Benutzer-Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login fehlgeschlagen');
            }

            localStorage.setItem('token', data.token);
            setToken(data.token);
            showMessage('Login erfolgreich!', 'success');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Funktion zum Abmelden
    const handleLogout = () => {
        localStorage.removeItem('token'); // Token entfernen
        setToken('');
        setUser(null);
        setError('');
        showMessage('Erfolgreich abgemeldet.', 'success');
        setIsEditingProfile(false); // Bearbeitungsmodus verlassen
    };

    // Funktion zum Hinzufügen einer Kompetenz
    const handleAddSkill = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        if (!newSkill.name.trim()) {
            setError('Kompetenzname darf nicht leer sein.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/profile/skills`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newSkill),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Kompetenz konnte nicht hinzugefügt werden');
            }

            // Aktualisiert die Benutzerdaten im Zustand mit den neuen Kompetenzen
            setUser(prevUser => ({
                ...prevUser,
                skills: data // Backend sendet das aktualisierte skills-Array zurück
            }));
            setNewSkill({ name: '', level: 'Beginner' }); // Formular zurücksetzen
            showMessage('Kompetenz erfolgreich hinzugefügt!', 'success');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Funktion zum Entfernen einer Kompetenz
    const handleDeleteSkill = async (skillId) => {
        setLoading(true);
        setError('');
        setMessage('');
        try {
            const response = await fetch(`${API_BASE_URL}/profile/skills/${skillId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Kompetenz konnte nicht gelöscht werden');
            }

            // Aktualisiert die Benutzerdaten im Zustand, indem die gelöschte Kompetenz entfernt wird
            setUser(prevUser => ({
                ...prevUser,
                skills: prevUser.skills.filter(skill => skill._id !== skillId)
            }));
            showMessage('Kompetenz erfolgreich entfernt!', 'success');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Funktion zum Speichern der Profilaktualisierungen
    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await fetch(`${API_BASE_URL}/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(tempProfileData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Profilaktualisierung fehlgeschlagen');
            }

            setUser(data); // Aktualisiert die Benutzerdaten mit den neuen Werten
            setIsEditingProfile(false); // Bearbeitungsmodus beenden
            showMessage('Profil erfolgreich aktualisiert!', 'success');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // JSX-Code für die Benutzeroberfläche
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
                Deine Kompetenz-App
            </h1>

            {/* Meldungsbereich */}
            {message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-4 text-center shadow-md">
                    {message}
                </div>
            )}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4 text-center shadow-md">
                    {error}
                </div>
            )}

            {loading && (
                <div className="flex items-center justify-center mb-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    <span className="text-white ml-3">Lädt...</span>
                </div>
            )}

            {!token ? (
                // Anzeige für Login/Registrierung, wenn kein Token vorhanden ist
                <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-105">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                        {isRegistering ? 'Registrieren' : 'Anmelden'}
                    </h2>
                    {isRegistering ? (
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Benutzername
                                </label>
                                <input
                                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    id="username"
                                    type="text"
                                    placeholder="Dein Benutzername"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    E-Mail
                                </label>
                                <input
                                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    id="email"
                                    type="email"
                                    placeholder="deine@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Passwort
                                </label>
                                <input
                                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105 shadow-lg"
                                disabled={loading}
                            >
                                Registrieren
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    E-Mail
                                </label>
                                <input
                                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    id="email"
                                    type="email"
                                    placeholder="deine@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Passwort
                                </label>
                                <input
                                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105 shadow-lg"
                                disabled={loading}
                            >
                                Anmelden
                            </button>
                        </form>
                    )}
                    <button
                        onClick={() => setIsRegistering(!isRegistering)}
                        className="mt-6 w-full text-indigo-600 hover:text-indigo-800 text-sm font-semibold transition duration-200 ease-in-out"
                    >
                        {isRegistering ? 'Ich habe bereits ein Konto' : 'Ich habe noch kein Konto'}
                    </button>
                </div>
            ) : (
                // Anzeige für das Profil, wenn ein Token vorhanden ist
                <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-105">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Dein Profil</h2>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
                        >
                            Abmelden
                        </button>
                    </div>

                    {user && (
                        <>
                            <div className="mb-6 border-b pb-4">
                                {isEditingProfile ? (
                                    <form onSubmit={handleSaveProfile} className="space-y-4">
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editUsername">
                                                Benutzername
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                                id="editUsername"
                                                type="text"
                                                value={tempProfileData.username}
                                                onChange={(e) => setTempProfileData({ ...tempProfileData, username: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editEmail">
                                                E-Mail
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                                id="editEmail"
                                                type="email"
                                                value={tempProfileData.email}
                                                onChange={(e) => setTempProfileData({ ...tempProfileData, email: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editFullName">
                                                Voller Name
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                                id="editFullName"
                                                type="text"
                                                value={tempProfileData.fullName}
                                                onChange={(e) => setTempProfileData({ ...tempProfileData, fullName: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsEditingProfile(false)}
                                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-200"
                                            >
                                                Abbrechen
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                                                disabled={loading}
                                            >
                                                Speichern
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div>
                                        <p className="text-gray-700 text-lg mb-2">
                                            <span className="font-semibold">Benutzername:</span> {user.username}
                                        </p>
                                        <p className="text-gray-700 text-lg mb-2">
                                            <span className="font-semibold">E-Mail:</span> {user.email}
                                        </p>
                                        <p className="text-gray-700 text-lg mb-4">
                                            <span className="font-semibold">Voller Name:</span> {user.fullName || 'Nicht angegeben'}
                                        </p>
                                        <button
                                            onClick={() => setIsEditingProfile(true)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
                                        >
                                            Profil bearbeiten
                                        </button>
                                    </div>
                                )}
                            </div>

                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Deine Kompetenzen</h3>
                            {user.skills && user.skills.length > 0 ? (
                                <ul className="mb-6 space-y-2">
                                    {user.skills.map((skill) => (
                                        <li key={skill._id} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm">
                                            <span className="text-gray-800">{skill.name} ({skill.level})</span>
                                            <button
                                                onClick={() => handleDeleteSkill(skill._id)}
                                                className="ml-4 bg-red-400 hover:bg-red-500 text-white text-sm font-bold py-1 px-3 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
                                            >
                                                Löschen
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600 mb-6">Noch keine Kompetenzen hinzugefügt.</p>
                            )}

                            <form onSubmit={handleAddSkill} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <input
                                    type="text"
                                    placeholder="Neue Kompetenz hinzufügen"
                                    value={newSkill.name}
                                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                                    className="flex-grow shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    required
                                />
                                <select
                                    value={newSkill.level}
                                    onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                                    className="shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                >
                                    <option value="Beginner">Anfänger</option>
                                    <option value="Intermediate">Fortgeschritten</option>
                                    <option value="Advanced">Experte</option>
                                    <option value="Expert">Meister</option>
                                </select>
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
                                    disabled={loading}
                                >
                                    Kompetenz hinzufügen
                                </button>
                            </form>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
