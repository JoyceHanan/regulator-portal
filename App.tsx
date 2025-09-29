import React, { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { User } from './types';
import { AlertTriangleIcon } from './components/icons/IconComponents';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState(true);

  // Check for API Key and a logged-in user in localStorage on initial load
  useEffect(() => {
    if (!process.env.API_KEY || process.env.API_KEY === '%%API_KEY%%') {
        console.error("API_KEY is not configured. Please set it in your environment variables during the build process.");
        setIsApiKeyConfigured(false);
    }
    
    try {
      const storedUser = localStorage.getItem('ayushUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('ayushUser');
    }
  }, []);

  const handleLogin = (loggedInUser: User) => {
    localStorage.setItem('ayushUser', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('ayushUser');
    setUser(null);
  };

  return (
    <>
      {!isApiKeyConfigured && (
        <div 
          className="fixed top-0 left-0 right-0 bg-danger text-white p-2 text-center text-sm z-50 flex items-center justify-center shadow-lg"
          role="alert"
        >
          <AlertTriangleIcon className="w-5 h-5 mr-3" />
          <span><strong>Configuration Error:</strong> AI features are disabled. The API key is not configured correctly.</span>
        </div>
      )}
      {!user 
        ? <Login onLogin={handleLogin} />
        : <Dashboard user={user} onLogout={handleLogout} />
      }
    </>
  );
};

export default App;
