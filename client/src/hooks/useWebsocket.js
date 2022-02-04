import { useEffect, useRef } from 'react';

const useWebsocket = (channelId, user, setState, wsType) => {
  const ws = useRef();

  // Websocket Connection
  useEffect(() => {
    ws.current = new WebSocket(
      process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_API_LOCAL_SOCKET_URL
        : process.env.REACT_APP_API_SOCKET_URL
    );

    // Send own user's connection
    ws.current.onopen = () => {
      console.log('Connected WebSocket from Server ✅');
      if (wsType === 'channel-connection') {
        ws.current.send(JSON.stringify({ channelId, userId: user._id, type: wsType }));
      }
      if (wsType === 'contact-connection') {
        ws.current.send(JSON.stringify({ userId: user._id, type: wsType }));
      }
    };

    // Get Response data
    ws.current.onmessage = (resWS) => {
      const res = JSON.parse(resWS.data);
      if (res.type === 'res-send-message') {
        // "setMessages" from 'containers/Chat/Conversation'
        setState((cur) => {
          let messageChannel = cur;
          messageChannel[res.msg.channel].currentMsgs = [...messageChannel[res.msg.channel].currentMsgs, res.msg];
          // let newMsgs = [...cur.currentMsgs, res.msg];
          // let page = cur.pageMsg;
          // return { currentMsgs: newMsgs, pageMsg: page };
          return { ...messageChannel };
        });
      }
      if (res.type === 'res-accept-pending-request') {
        // "setAllContacts" from 'pages/ContactPage
        setState((cur) => {
          let cloneAllContacts = Object.assign({}, cur);
          cloneAllContacts.chatChannels = [res.contactInfoData.chatChannel, ...cloneAllContacts.chatChannels];
          cloneAllContacts.contacts = [...cloneAllContacts.contacts, res.contactInfoData.contact];
          return cloneAllContacts;
        });
      }
    };

    ws.current.onclose = () => {
      console.log('Disconnected WebSocket from Server ❌');
    };

    // Cleanup websocket
    return () => {
      ws.current.close();
    };
  }, [channelId, user, setState, wsType]);

  return ws;
};

export default useWebsocket;
