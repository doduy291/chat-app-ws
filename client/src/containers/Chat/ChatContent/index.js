import React, { useEffect, useState, useCallback } from 'react';
import { Grid } from '@mui/material';
import { useRouteMatch } from 'react-router-dom';
import Conversation from './Conversation';
import ChannelInfo from './ChannelInfo';
import { useGetDetailChannel } from '../../../services/channel.api';

const ChatContent = () => {
  const match = useRouteMatch('/channel/:channelId');
  const channelId = match?.params?.channelId;

  const { data: detailChannelData } = useGetDetailChannel(channelId);

  const [showSidebarInfo, setShowSidebarInfo] = useState(false);

  useEffect(() => {
    if (channelId) {
      setShowSidebarInfo(false);
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
      <Conversation toggleInfo={toggleInfo} channelId={channelId} detailChannel={detailChannelData} />
      {showSidebarInfo && (
        <ChannelInfo
          setIsShown={setShowSidebarInfo}
          isShown={showSidebarInfo}
          toggleInfo={toggleInfo}
          detailChannel={detailChannelData}
        />
      )}
    </Grid>
  );
};

export default ChatContent;
