import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ChannelContainer, ChannelTitle, ChannelItem, ChannelLink, ChannelName } from './styles';
import { AddBox } from '@mui/icons-material';
import DialogCreateChannel from '../../../components/Dialog/CreateChannel';
import { fetchGetListGroupChannels } from '../../../api/channel.api';
import { fetchGetAllContacts } from '../../../api/contact.api';

const GroupChannel = ({ channelId }) => {
  console.log('grouP-channel');
  const { isCreated } = useSelector((state) => state.channel);
  const [groups, setGroups] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [dialogCreate, setDialogCreate] = useState(false);

  const openDialogHandler = () => {
    setDialogCreate(true);
  };

  useEffect(() => {
    fetchGetListGroupChannels(setGroups);
  }, [isCreated]);

  useEffect(() => {
    fetchGetAllContacts(setContacts);
  }, []);
  return (
    <>
      <ChannelContainer>
        <ChannelTitle className="channel__title">
          <span>CHANNELS</span>
          <div className="add-icon" onClick={openDialogHandler}>
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

      {dialogCreate && (
        <DialogCreateChannel open={dialogCreate} setDialogCreate={setDialogCreate} contacts={contacts} />
      )}
    </>
  );
};

export default GroupChannel;
