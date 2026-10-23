// src/AppContext.js
import React, { createContext, useEffect, useState } from 'react';

const AppContext = createContext();

const getLanguageFromPath = () => {
  const pathLanguage = window.location.pathname.split('/').filter(Boolean)[0]?.toUpperCase();
  return pathLanguage === 'SA' || pathLanguage === 'RU' ? pathLanguage : 'GB';
};

const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState(getLanguageFromPath);
  const [success,setSuccess] =useState(false)

  useEffect(() => {
    const syncLanguageWithPath = () => setLanguage(getLanguageFromPath());
    window.addEventListener('popstate', syncLanguageWithPath);
    return () => window.removeEventListener('popstate', syncLanguageWithPath);
  }, []);

  return (
    <AppContext.Provider value={{ language, setLanguage,success,setSuccess }} >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
