import React, { useState, useEffect } from 'react';
import { ChannelContainer, ChannelTitle, ChannelItem, ChannelLink, ChannelName } from './styles';
import { fetchGetListGroupChannels } from '../../../api/channel.api';
import { AddBox } from '@mui/icons-material';
import { Dialog } from '@mui/material';
const GroupChannel = ({ channelId }) => {
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    fetchGetListGroupChannels(setGroups);
  }, []);

  return (
    <>
      <ChannelContainer>
        <ChannelTitle className="channel__title">
          <span>CHANNELS</span>
          <div className="add-icon" onClick={handleClickOpen}>
            <AddBox />
          </div>
        </ChannelTitle>
        {groups?.map((element, i) => (
          <ChannelItem className={`channel__item ${channelId === element._id ? 'active' : ''}`} key={i}>
            <ChannelLink to={`/channel/${element._id}`} className="channel__link">
              <div className="circle">#</div>
              <ChannelName className="channel__name">{element.channelName}</ChannelName>
            </ChannelLink>
          </ChannelItem>
        ))}
      </ChannelContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        Test
      </Dialog>
    </>
  );
};

export default GroupChannel;
