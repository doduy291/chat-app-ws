import React, { useEffect, useState, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Conversation from './Conversation';
import ChannelInfo from './ChannelInfo';
import { getSelectedChannel } from '../../../redux/actions/channel.action';
import { getMessageChannel } from '../../../redux/actions/message.action';

const ChatContent = () => {
  const match = useRouteMatch('/channel/:channelId');
  const channelId = match?.params?.channelId;

  const [showSidebarInfo, setShowSidebarInfo] = useState(false);
  const dispatch = useDispatch();
  const ws = useRef();

  useEffect(() => {
    ws.current = new WebSocket(
      process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_API_LOCAL_SOCKET_URL
        : process.env.REACT_APP_API_SOCKET_URL
    );
    // Test
    ws.current.onmessage = (message) => {
      console.log(JSON.parse(message.data));
    };
    ws.current.onopen = () => {
      console.log('Connected WebSocket from Server ✅');
    };
    ws.current.onclose = () => {
      console.log('Disconnected WebSocket from Server ❌');
    };

    return () => {
      console.log('Cleaning up! 🧼');
      ws.current.close();
    };
  }, []);

  const toggleInfo = (toggle) => (e) => {
    e.preventDefault();
    setShowSidebarInfo(toggle);
  };

  useEffect(() => {
    if (channelId) {
      dispatch(getSelectedChannel({ channelId }));
      dispatch(getMessageChannel({ channelId }));
    }
  }, [dispatch, channelId]);

  return (
    <>
      <Conversation toggleInfo={toggleInfo} channelId={channelId} ws={ws} />
      <ChannelInfo isShown={showSidebarInfo} toggleInfo={toggleInfo} />
    </>
  );
};

export default ChatContent;
