import React, { useEffect, useState } from 'react';
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
      <Conversation toggleInfo={toggleInfo} />
      <ChannelInfo isShown={showSidebarInfo} toggleInfo={toggleInfo} />
    </>
  );
};

export default ChatContent;
