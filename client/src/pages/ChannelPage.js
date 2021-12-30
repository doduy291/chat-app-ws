import React from 'react';
import { Switch } from 'react-router-dom';
import { Grid } from '@mui/material';

import ChatSidebar from '../containers/Chat/ChatSidebar';

import { renderSubChannelRoutes } from '../configs/router.config';

const ChannelPage = () => {
  return (
    <>
      <Grid container spacing={0}>
        <ChatSidebar />
        <Switch>{renderSubChannelRoutes()}</Switch>
      </Grid>
    </>
  );
};

export default ChannelPage;
