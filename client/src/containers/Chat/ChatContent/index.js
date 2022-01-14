import React, { useEffect, useState, useCallback } from 'react';
import { Grid } from '@mui/material';
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
      setShowSidebarInfo(false);
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
    <Grid container wrap="nowrap">
      <Conversation toggleInfo={toggleInfo} channelId={channelId} detailChannel={detailChannel} />
      {showSidebarInfo && (
        <ChannelInfo
          setIsShown={setShowSidebarInfo}
          isShown={showSidebarInfo}
          toggleInfo={toggleInfo}
          detailChannel={detailChannel}
        />
      )}
    </Grid>
  );
};

export default ChatContent;
