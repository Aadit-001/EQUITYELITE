class WebSocketService {
    constructor() {
      this.socket = null;
      this.subscribers = [];
    }
  
    connect(url) {
      this.socket = new WebSocket(url);
  
      this.socket.onopen = () => {
        console.log('WebSocket connection opened.');
      };
  
      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'ping') { console.log('Ping message received'); return;
        this.subscribers.forEach((callback) => callback(data));
      };
  
      this.socket.onclose = () => {
        console.log('WebSocket connection closed.');
      };
  
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        console.error('Error details:', error.message);
      };
    }
  
    subscribe(callback) {
      this.subscribers.push(callback);
    }
  
    unsubscribe(callback) {
      this.subscribers = this.subscribers.filter((sub) => sub !== callback);
    }
  
    send(message) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(message));
      }
    }
  
    disconnect() {
      if (this.socket) {
        this.socket.close();
      }
    }
  }
  
  const webSocketService = new WebSocketService();
  export default webSocketService;
  