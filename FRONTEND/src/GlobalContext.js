import React, { createContext } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const globalVariable = 'https://equityelite-1.onrender.com';

  return (
    <GlobalContext.Provider value={{ globalVariable}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
