import { WebSocketServer } from 'ws';

const useWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  // Don't let variable in block wss.on, it causes refresh
  let channels = new Set();

  wss.on('connection', (socket) => {
    console.log('WebSocket connected ✅');
    let channelRef;

    socket.on('message', (message) => {
      const data = JSON.parse(message);

      switch (data.type) {
        case 'channel-connection':
          // Push socket to use for loop in case 'res-send-message', send the whole user in channel
          channelRef = { socket, ...data };
          channels.add(channelRef);
          break;

        case 'res-send-message':
          const filteredChannels = [...channels].filter(
            (filterChannel) => filterChannel.channelId === data.msg.channel || filterChannel.userId === data.msg.userId
          );
          for (const channel of filteredChannels) {
            channel.socket.send(JSON.stringify(data));
          }

          break;

        default:
          break;
      }
    });

    socket.on('close', () => {
      console.log('WebSocket disconnected ❌');
      channels.delete(channelRef);
    });
  });
};

export default useWebSocket;
