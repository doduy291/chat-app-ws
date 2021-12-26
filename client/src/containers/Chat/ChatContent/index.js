import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Conversation from './Conversation';
import ChannelInfo from './ChannelInfo';
import { fetchGetDetailChannel } from '../../../api/channel.api';

const ChatContent = () => {
  const match = useRouteMatch('/channel/:channelId');
  const channelId = match?.params?.channelId;
  const [detailChannel, setDetailChannel] = useState({});
  const [showSidebarInfo, setShowSidebarInfo] = useState(false);

  const ws = useRef();

  // useEffect(() => {
  //   ws.current = new WebSocket(
  //     process.env.NODE_ENV === 'development'
  //       ? process.env.REACT_APP_API_LOCAL_SOCKET_URL
  //       : process.env.REACT_APP_API_SOCKET_URL
  //   );
  //   // Test
  //   ws.current.onmessage = (message) => {
  //     console.log(JSON.parse(message.data));
  //   };
  //   ws.current.onopen = () => {
  //     console.log('Connected WebSocket from Server ✅');
  //   };
  //   ws.current.onclose = () => {
  //     console.log('Disconnected WebSocket from Server ❌');
  //   };

  //   return () => {
  //     console.log('Cleaning up! 🧼');
  //     ws.current.close();
  //   };
  // }, []);
  // console.log(detailChannel);

  useEffect(() => {
    fetchGetDetailChannel(channelId, setDetailChannel);
  }, [channelId]);

  const toggleInfo = useCallback(
    (toggle) => (e) => {
      e.preventDefault();
      setShowSidebarInfo(toggle);
    },
    []
  );

  return (
    <>
      <Conversation toggleInfo={toggleInfo} channelId={channelId} ws={ws} detailChannel={detailChannel} />
      <ChannelInfo isShown={showSidebarInfo} toggleInfo={toggleInfo} detailChannel={detailChannel} />
    </>
  );
};

export default ChatContent;
