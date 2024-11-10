
import React, { useState } from 'react';
// import './App.css';
import StocksPage from './StocksPage';

function New() {
  const [showMessage, setShowMessage] = useState(false);

  const toggleMessage = () => {
    setShowMessage(!showMessage);
  };

  return (
    <div>
      <StocksPage />
    </div>
  );
}

export default New;
