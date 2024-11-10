// StockData.js
import React from 'react';
import { useWebSocket } from '../webSocket/WebSocketContext';
import moment from 'moment';


const StockData = () => {
  const { data, send } = useWebSocket();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 pt-20">Stock Data</h2>
      <div className="grid grid-cols-1 gap-4">
        {data && data.length > 0 ? (
          data.map((msg, index) => (
            Array.isArray(msg.data) ? msg.data.map((trade, idx) => (
              <div key={`${index}-${idx}`} className="bg-gray-800 p-4 rounded-lg shadow-md text-white">
                <h3 className="text-xl font-semibold text-white">Symbol: {trade.s}</h3>
                <p className="text-lg text-white">Price: ${trade.p.toFixed(2)}</p>
                <p className="text-md text-white">Volume: {trade.v}</p>
                <p className="text-sm text-white">Time: {moment(trade.t).format('YYYY-MM-DD HH:mm:ss')}</p>
                <p className="text-xs text-white">Conditions: {trade.c.join(', ')}</p>
              </div>
            )) : null
          ))
        ) : (
          <p className="text-white">No data available</p>
        )}
      </div>
      <div className="mt-4">
        <button
          onClick={() => send({ type: 'subscribe', symbol: 'AAPL' })}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Subscribe to AAPL
        </button>
        <button
          onClick={() => send({ type: 'unsubscribe', symbol: 'AAPL' })}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Unsubscribe from AAPL
        </button>
      </div>
    </div>
  );
};

export default StockData;
