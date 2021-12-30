import React, { useEffect, useState, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Conversation from './Conversation';
import ChannelInfo from './ChannelInfo';
import { fetchGetDetailChannel } from '../../../api/channel.api';

const ChatContent = () => {
  const match = useRouteMatch('/channel/:channelId');
  const channelId = match?.params?.channelId;
  const [showSidebarInfo, setShowSidebarInfo] = useState(false);
  const [detailChannel, setDetailChannel] = useState({});

  useEffect(() => {
    if (channelId) {
      fetchGetDetailChannel(channelId, setDetailChannel);
    }
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
      <Conversation toggleInfo={toggleInfo} channelId={channelId} detailChannel={detailChannel} />
      <ChannelInfo isShown={showSidebarInfo} toggleInfo={toggleInfo} detailChannel={detailChannel} />
    </>
  );
};

export default ChatContent;
