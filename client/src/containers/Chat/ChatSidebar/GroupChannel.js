import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ChannelContainer, ChannelTitle, ChannelItem, ChannelLink, ChannelName } from './styles';
import { AddBox } from '@mui/icons-material';
import DialogCreateChannel from '../../../components/Dialog/CreateChannel';
import contactService from '../../../services/contact.api';
import channelService from '../../../services/channel.api';

const GroupChannel = ({ channelId }) => {
  const { data: groupChannelsData, mutate } = channelService.useGetListGroupChannels();
  const { data: contactsData } = contactService.useGetAllContacts();

  const { isCreated } = useSelector((state) => state.channel);
  const [dialogCreate, setDialogCreate] = useState(false);

  const openDialogHandler = () => {
    setDialogCreate(true);
  };

  useEffect(() => {
    if (isCreated) {
      mutate();
    }
  }, [isCreated, mutate]);

  return (
    <>
      <ChannelContainer>
        <ChannelTitle className="channel__title">
          <span>CHANNELS</span>
          <div className="add-icon" onClick={openDialogHandler}>
            <AddBox />
          </div>
        </ChannelTitle>
        {groupChannelsData?.map((element, i) => (
          <ChannelItem className={`channel__item ${channelId === element._id ? 'active' : ''}`} key={i}>
            <ChannelLink to={`/channel/${element._id}`} className="channel__link">
              <div className="circle">#</div>
              <ChannelName className="channel__name">{element.channelName}</ChannelName>
            </ChannelLink>
          </ChannelItem>
        ))}
      </ChannelContainer>

      {dialogCreate && (
        <DialogCreateChannel open={dialogCreate} setDialogCreate={setDialogCreate} contacts={contactsData.contacts} />
      )}
    </>
  );
};

export default GroupChannel;
