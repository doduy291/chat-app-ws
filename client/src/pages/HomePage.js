import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router-dom';

import { Grid } from '@mui/material';
import ChatChannelInfo from '../containers/Chat/ChatChannelInfo';
import ChatSidebar from '../containers/Chat/ChatSidebar';
import ChatContent from '../containers/Chat/ChatContent';

import { getSelectedChannel } from '../redux/actions/channel.action';

const HomePage = () => {
  const [showSidebarInfo, setShowSidebarInfo] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const match = useRouteMatch('/channel/:channelId');

  const channelId = match?.params?.channelId;
  const checkPath = location.pathname === '/channel' || [location.pathname].includes('/');

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

export default HomePage;
