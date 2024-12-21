import React, { createContext } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const globalVariable = 'http://localhost:3000';

  return (
    <GlobalContext.Provider value={{ globalVariable}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
