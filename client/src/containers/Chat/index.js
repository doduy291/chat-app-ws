import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router-dom';

import { Grid } from '@mui/material';
import ChatChannelInfo from './ChatChannelInfo/index';
import ChatSidebar from './ChatSidebar/index';
import ChatContent from './ChatContent/index';

import { getSelectedChannel } from '../../redux/actions/channel.action';

const Chat = () => {
  const [showSidebarInfo, setShowSidebarInfo] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const match = useRouteMatch('/channel/:channelId');

  const channelId = match?.params?.channelId;
  const checkPath = [location.pathname].includes('/channel') || [location.pathname].includes('/');

  useEffect(() => {
    if (channelId) {
      dispatch(getSelectedChannel({ channelId }));
    }
  }, [dispatch, channelId]);

  return (
    <>
      <Grid container spacing={0}>
        <ChatSidebar channelId={channelId} />
        {checkPath ? (
          <div>Looking for someone to chat bro.</div>
        ) : (
          <>
            <ChatContent setShowSidebarInfo={setShowSidebarInfo} />
            <ChatChannelInfo isShowed={{ showSidebarInfo, setShowSidebarInfo }} />
          </>
        )}
      </Grid>
    </>
  );
};

export default Chat;
