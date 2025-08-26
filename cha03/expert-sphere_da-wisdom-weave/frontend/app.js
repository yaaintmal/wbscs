import React, { useState, useEffect, createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// Firestore-Importe entfernt, da Datenbankzugriff über Backend erfolgt
// import { getFirestore, doc, getDoc, setDoc, collection, query, where, onSnapshot, orderBy, serverTimestamp, addDoc, updateDoc, runTransaction } from 'firebase/firestore';

// Kontext für Firebase Auth, Benutzer und App-ID
const AppContext = createContext(null);

// Die Haupt-App-Komponente
const App = () => {
  const [app, setApp] = useState(null);
  // const [db, setDb] = useState(null); // Firestore-DB-Instanz entfernt
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null); // Firebase User Objekt
  const [userId, setUserId] = useState(null); // Unsere interne userId (uid oder random)
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [currentPage, setCurrentPage] = useState('login'); // Aktuelle Seite: login, feed, ask, profile, cockpit
  const [currentPageParams, setCurrentPageParams] = useState({}); // Für Parameter wie questionId

  // Funktion zum Wechseln der Seite mit optionalen Parametern
  const navigateTo = (page, params = {}) => {
    setCurrentPage(page);
    setCurrentPageParams(params);
  };

  useEffect(() => {
    try {
      // Zugriff auf globale Canvas-Variablen
      const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

      if (!Object.keys(firebaseConfig).length) {
        console.error("Firebase Konfiguration nicht gefunden. Bitte stelle sicher, dass __firebase_config gesetzt ist.");
        return;
      }

      const firebaseApp = initializeApp(firebaseConfig);
      // const firestoreDb = getFirestore(firebaseApp); // Firestore-Initialisierung entfernt
      const firebaseAuth = getAuth(firebaseApp);

      setApp(firebaseApp);
      // setDb(firestoreDb); // Firestore-DB-Instanz entfernt
      setAuth(firebaseAuth);

      const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          setUserId(currentUser.uid);
          // Wenn der Benutzer angemeldet ist, navigiere zum Feed
          navigateTo('feed');
        } else {
          setUser(null);
          // Wenn kein Token vorhanden ist, anonym anmelden
          if (!initialAuthToken) {
            console.log("Anonym anmelden...");
            await signInAnonymously(firebaseAuth);
            // Der onAuthStateChanged Listener wird erneut getriggert mit dem anonymen Benutzer
          } else {
            // Wenn Token vorhanden ist, damit anmelden
            try {
              console.log("Anmelden mit Custom Token...");
              await signInWithCustomToken(firebaseAuth, initialAuthToken);
            } catch (error) {
              console.error("Fehler bei der Anmeldung mit Custom Token:", error);
              // Fallback: Anonym anmelden, wenn Custom Token fehlschlägt
              await signInAnonymously(firebaseAuth);
            }
          }
          navigateTo('login'); // Zurück zur Login-Seite, wenn abgemeldet
        }
        setIsAuthReady(true);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Fehler bei der Firebase-Initialisierung:", error);
    }
  }, []); // Leeres Array, damit dies nur einmal beim Mounten ausgeführt wird

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      navigateTo('login');
    }
  };

  if (!isAuthReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Lade ExpertSphere...</div>
      </div>
    );
  }

  const renderPage = () => {
    if (!user) {
      return <AuthPage auth={auth} navigateTo={navigateTo} />;
    }

    switch (currentPage) {
      case 'feed':
        return <QuestionFeed userId={userId} navigateTo={navigateTo} auth={auth} />;
      case 'ask':
        return <AskQuestionForm userId={userId} navigateTo={navigateTo} auth={auth} />;
      case 'profile':
        return <ProfilePage userId={userId} auth={auth} />;
      case 'cockpit':
        return <ExpertCockpit userId={userId} auth={auth} />;
      case 'question-detail':
        // Frage-ID als Prop übergeben
        return <QuestionDetail userId={userId} navigateTo={navigateTo} auth={auth} questionId={currentPageParams.questionId} />;
      default:
        return <QuestionFeed userId={userId} navigateTo={navigateTo} auth={auth} />;
    }
  };

  return (
    <AppContext.Provider value={{ auth, user, userId, appId: typeof __app_id !== 'undefined' ? __app_id : 'default-app-id' }}>
      <div className="min-h-screen bg-gray-100 font-inter antialiased flex flex-col">
        {user && (
          <nav className="bg-white p-4 shadow-md flex justify-between items-center fixed top-0 w-full z-10 rounded-b-lg">
            <h1 className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => navigateTo('feed')}>
              ExpertSphere
            </h1>
            <div className="flex space-x-4">
              <NavButton onClick={() => navigateTo('feed')}>Fragen-Feed</NavButton>
              <NavButton onClick={() => navigateTo('ask')}>Frage stellen</NavButton>
              <NavButton onClick={() => navigateTo('profile')}>Profil</NavButton>
              <NavButton onClick={() => navigateTo('cockpit')}>Experten-Cockpit</NavButton>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Abmelden
              </button>
            </div>
          </nav>
        )}
        <main className={`${user ? 'pt-20' : ''} flex-grow p-4 md:p-8`}>
          {renderPage()}
        </main>
      </div>
    </AppContext.Provider>
  );
};

// --- Navigations-Button Komponente ---
const NavButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
  >
    {children}
  </button>
);

// --- AuthPage Komponente (Login/Registrierung) ---
const AuthPage = ({ auth, navigateTo }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage('Erfolgreich angemeldet!');
        navigateTo('feed');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage('Erfolgreich registriert! Bitte melde dich jetzt an.');
        setIsLogin(true); // Nach Registrierung zum Login wechseln
      }
    } catch (err) {
      console.error("Auth-Fehler:", err);
      setError(`Fehler: ${err.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {isLogin ? 'Anmelden' : 'Registrieren'}
        </h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">{error}</div>}
        {message && <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Passwort
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            {isLogin ? 'Anmelden' : 'Registrieren'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition duration-200"
          >
            {isLogin ? 'Noch kein Konto? Hier registrieren' : 'Bereits registriert? Hier anmelden'}
          </button>
        </div>
      </div>
    </div>
  );
};


// --- QuestionFeed Komponente ---
const QuestionFeed = ({ userId, navigateTo, auth }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('relevant'); // 'relevant', 'askedByMe'

  useEffect(() => {
    if (!userId) return;

    const fetchQuestions = async () => {
      setLoading(true);
      setError('');
      try {
        let endpoint = '';
        if (activeTab === 'relevant') {
          endpoint = `/api/user/${userId}/questions/assigned`;
        } else if (activeTab === 'askedByMe') {
          endpoint = `/api/user/${userId}/questions/asked`; // Neues Backend-Endpoint
        }

        const response = await fetch(`http://localhost:5601${endpoint}`, {
          headers: {
            'Authorization': `Bearer ${await auth.currentUser.getIdToken()}`
          }
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Fehler beim Laden der Fragen');
        }

        // Datumswerte korrekt parsen, da sie vom Backend als ISO-Strings kommen könnten
        const formattedQuestions = data.map(q => ({
          ...q,
          createdAt: new Date(q.createdAt).toLocaleString()
        }));
        setQuestions(formattedQuestions);
      } catch (err) {
        console.error("Fehler beim Laden der Fragen:", err);
        setError("Fehler beim Laden der Fragen. Bitte versuchen Sie es später erneut.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
    // Hinweis: Echtzeit-Updates für den Feed würden WebSockets erfordern,
    // was über den Umfang dieses Beispiels hinausgeht. Hier ist es ein einfacher Fetch.
  }, [userId, activeTab, auth]);

  return (
    <div className="container mx-auto p-4 pt-24">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Dein Fragen-Feed</h2>

      <div className="flex justify-center mb-6 space-x-4">
        <FeedTabButton isActive={activeTab === 'relevant'} onClick={() => setActiveTab('relevant')}>
          Relevante Fragen
        </FeedTabButton>
        <FeedTabButton isActive={activeTab === 'askedByMe'} onClick={() => setActiveTab('askedByMe')}>
          Meine Fragen
        </FeedTabButton>
        {/* 'Beantwortete Fragen' können wir später implementieren, da es eine komplexere Backend-Query ist */}
        <FeedTabButton isActive={activeTab === 'answeredByMe'} onClick={() => setError('Diese Funktion ist noch nicht verfügbar.')}>
          Beantwortete Fragen (TBD)
        </FeedTabButton>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-gray-600">Lade Fragen...</p>
        </div>
      )}
      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center shadow-md">{error}</div>}
      {!loading && !error && questions.length === 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-600">
          <p>Keine Fragen gefunden in dieser Kategorie.</p>
          {activeTab === 'relevant' && <p>Dir werden Fragen zugewiesen, die zu deinen Kompetenzen passen.</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} navigateTo={navigateTo} auth={auth} />
        ))}
      </div>
    </div>
  );
};

const FeedTabButton = ({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`py-2 px-6 rounded-lg text-lg font-semibold transition duration-300 ease-in-out ${
      isActive
        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    {children}
  </button>
);


// --- QuestionCard Komponente ---
const QuestionCard = ({ question, navigateTo, auth }) => {
  const [askerUsername, setAskerUsername] = useState('Unbekannter Nutzer');

  useEffect(() => {
    const fetchAskerUsername = async () => {
      if (question.askerId) {
        try {
          const response = await fetch(`http://localhost:5601/api/user/${question.askerId}/profile-public`, {
            headers: { 'Authorization': `Bearer ${await auth.currentUser.getIdToken()}` }
          });
          const data = await response.json();
          if (response.ok) {
            setAskerUsername(data.username || `User_${question.askerId.substring(0, 6)}`);
          } else {
            console.warn("Konnte Benutzernamen für Frage nicht abrufen:", data.message);
          }
        } catch (err) {
          console.error("Fehler beim Abrufen des Benutzernamens:", err);
        }
      }
    };
    fetchAskerUsername();
  }, [question.askerId, auth]);

  return (
    <div
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-200"
      onClick={() => navigateTo('question-detail', { questionId: question.id })}
    >
      <h3 className="text-xl font-bold text-gray-800 mb-2">{question.title}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{question.description}</p>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
          {question.category.replace(/_/g, ' ')}
        </span>
        <span>Von {askerUsername} am {question.createdAt}</span>
      </div>
      <div className="mt-3 text-sm font-semibold text-gray-700">
        Status: <span className={`font-bold ${question.status === 'open' ? 'text-red-500' : 'text-green-600'}`}>
          {question.status === 'open' ? 'Offen' : 'Beantwortet'}
        </span>
      </div>
    </div>
  );
};

// --- AskQuestionForm Komponente ---
const AskQuestionForm = ({ userId, navigateTo, auth }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState({ city: '', country: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setLocation({ city: 'Geseke', country: 'DE' }); // Beispielwert, kann durch GPS ersetzt werden
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    if (!title || !description || !location.city || !location.country) {
      setError('Bitte füllen Sie alle Felder aus, einschließlich des Standorts.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5601/api/questions/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await auth.currentUser.getIdToken()}`
        },
        body: JSON.stringify({ userId, title, description, location })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Fehler beim Stellen der Frage');
      }

      setMessage('Frage erfolgreich gestellt! Experten werden benachrichtigt.');
      setTitle('');
      setDescription('');
      setTimeout(() => navigateTo('feed'), 2000);

    } catch (err) {
      console.error("Fehler beim Senden der Frage:", err);
      setError(`Fehler: ${err.message || 'Etwas ist schief gelaufen.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 pt-24">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Neue Frage stellen</h2>
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto border border-gray-200">
        {message && <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">{message}</div>}
        {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Titel der Frage
            </label>
            <input
              type="text"
              id="title"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Kurze und prägnante Zusammenfassung"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Detaillierte Beschreibung
            </label>
            <textarea
              id="description"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 h-32 resize-y"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Beschreiben Sie Ihr Problem oder Ihre Frage so detailliert wie möglich..."
              required
            ></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="location-city" className="block text-gray-700 text-sm font-bold mb-2">
                Ort (Stadt)
              </label>
              <input
                type="text"
                id="location-city"
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={location.city}
                onChange={(e) => setLocation({ ...location, city: e.target.value })}
                placeholder="Ihre Stadt"
                required
              />
            </div>
            <div>
              <label htmlFor="location-country" className="block text-gray-700 text-sm font-bold mb-2">
                Land
              </label>
              <input
                type="text"
                id="location-country"
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={location.country}
                onChange={(e) => setLocation({ ...location, country: e.target.value })}
                placeholder="Ihr Land"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            disabled={loading}
          >
            {loading ? 'Sende Frage...' : 'Frage stellen'}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- QuestionDetail Komponente ---
const QuestionDetail = ({ userId, questionId, auth }) => {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswerText, setNewAnswerText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [answerSubmitting, setAnswerSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!questionId) {
      setError("Keine Frage zum Anzeigen ausgewählt.");
      setLoading(false);
      return;
    }

    const fetchQuestionAndAnswers = async () => {
      setLoading(true);
      setError('');
      try {
        // Frage laden
        const questionResponse = await fetch(`http://localhost:5601/api/questions/${questionId}`, {
          headers: { 'Authorization': `Bearer ${await auth.currentUser.getIdToken()}` }
        });
        const questionData = await questionResponse.json();
        if (!questionResponse.ok) {
          throw new Error(questionData.message || 'Fehler beim Laden der Frage');
        }
        setQuestion({
          ...questionData,
          createdAt: new Date(questionData.createdAt).toLocaleString()
        });

        // Antworten laden
        const answersResponse = await fetch(`http://localhost:5601/api/questions/${questionId}/answers`, {
          headers: { 'Authorization': `Bearer ${await auth.currentUser.getIdToken()}` }
        });
        const answersData = await answersResponse.json();
        if (!answersResponse.ok) {
          throw new Error(answersData.message || 'Fehler beim Laden der Antworten');
        }
        const formattedAnswers = answersData.map(a => ({
          ...a,
          createdAt: new Date(a.createdAt).toLocaleString()
        }));
        setAnswers(formattedAnswers);

      } catch (err) {
        console.error("Fehler beim Laden von Frage/Antworten:", err);
        setError(`Fehler: ${err.message || 'Etwas ist schief gelaufen.'}`);
      }
      setLoading(false);
    };

    fetchQuestionAndAnswers();
  }, [questionId, auth]);

  
