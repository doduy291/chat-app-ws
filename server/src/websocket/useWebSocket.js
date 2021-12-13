import { WebSocketServer } from 'ws';

const useWebSocket = (server) => {
  const wss = new WebSocketServer({ server });
  wss.on('connection', (socket) => {
    console.log('WebSocket connected ✅');
    socket.on('message', (message) => {
      console.log(JSON.parse(message));
    });
    socket.on('close', () => console.log('WebSocket disconnected ❌'));
    socket.send(JSON.stringify({ abc: 'testttttttttttt' }));
  });
};
export default useWebSocket;