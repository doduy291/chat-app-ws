import { WebSocketServer } from 'ws';

const useWebsocketServer = (server) => {
  const wss = new WebSocketServer({ server });

  // Don't let variable in block wss.on, it causes refresh
  let channels = new Set();
  let contacts = new Set();

  wss.on('connection', (socket) => {
    // console.log('WebSocket connected ✅');
    let channelRef;
    let contactRef;

    socket.on('message', (message) => {
      const data = JSON.parse(message);
      // console.log('*********** Data ***********');
      // console.log(data);
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

        case 'contact-connection':
          contactRef = { socket, ...data };
          contacts.add(contactRef);
          break;

        case 'res-accept-pending-request':
          const chatChannel = data.contactInfoData.chatChannel;
          const contactInfoArr = data.contactInfoData.contactInfoArr;
          const dataType = data.type;
          const filteredContacts = [...contacts].filter((filteredContact) =>
            chatChannel.members.includes(filteredContact.userId)
          );

          for (const contact of filteredContacts) {
            const filteredContactInfos = contactInfoArr.filter((contactInfo) => contactInfo._id !== contact.userId);
            contact.socket.send(
              JSON.stringify({
                contactInfoData: {
                  chatChannel,
                  contact: filteredContactInfos[0],
                },
                type: dataType,
              })
            );
          }
          break;

        default:
          break;
      }
    });

    socket.on('close', () => {
      // console.log('WebSocket disconnected ❌');
      channels.delete(channelRef);
      contacts.delete(contactRef);
    });
  });
};

export default useWebsocketServer;
