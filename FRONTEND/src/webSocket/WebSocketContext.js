import React, { createContext, useContext, useEffect, useState } from 'react';
import webSocketService from './webSocketService';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const [data, setData] = useState([]); // Initialize as an empty array
    
    useEffect(() => {
    webSocketService.connect('wss://ws.finnhub.io?token=crevrs1r01qk4jsagvl0crevrs1r01qk4jsagvlg');
    // webSocketService.connect('wss://ws.finnhub.io?token=YOUR_API_KEY');

    const handleNewData = (newData) => {
      setData((prevData) => [...prevData, newData]);
    };

    webSocketService.subscribe(handleNewData);

    return () => {
      webSocketService.unsubscribe(handleNewData);
      webSocketService.disconnect();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ data, send: webSocketService.send }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
