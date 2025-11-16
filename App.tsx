
import React, { useState, useEffect } from 'react';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { app } from './services/firebaseConfig';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Dashboard from './views/Dashboard';
import Transactions from './views/Transactions';
import Accounts from './views/Accounts';
import Categories from './views/Categories';
import More from './views/More';
import { DataProvider } from './context/DataContext';

const auth = getAuth(app);

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    signInAnonymously(auth).catch((error) => {
      console.error("Anonymous sign-in failed", error);
    });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <Transactions />;
      case 'accounts':
        return <Accounts />;
      case 'categories':
        return <Categories />;
      case 'more':
        return <More />;
      default:
        return <Dashboard />;
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Initializing...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 flex items-center justify-center min-h-screen p-0 sm:p-4">
      <div className="phone-frame w-full max-w-md mx-auto rounded-3xl overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl h-screen sm:h-[85vh] sm:max-h-[900px] flex flex-col">
        {user ? (
          <DataProvider userId={user.uid}>
            <Header userId={user.uid} />
            <main className="app-body p-3 overflow-y-auto flex-1">
              {renderView()}
            </main>
            <BottomNav activeView={activeView} setActiveView={setActiveView} />
          </DataProvider>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <p>Authenticating...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
