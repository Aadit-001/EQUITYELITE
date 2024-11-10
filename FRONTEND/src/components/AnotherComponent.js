// AnotherComponent.js
import React from 'react';
import { useWebSocket } from '../webSocket/WebSocketContext';

const AnotherComponent = () => {
  const { data } = useWebSocket();

  return (
    <div>
      <h2>Another Component</h2>
      <ul>
        {data.map((msg, index) => (
          <li key={index}>{JSON.stringify(msg)}</li>
        ))}
      </ul>
    </div>
  );
};

export default AnotherComponent;
