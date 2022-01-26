import React from 'react';
import { Link } from 'react-router-dom';

import { ChatBubble, Call } from '@mui/icons-material';
import {
  OnlineTabContent,
  TabContentButtons,
  TabContentContainer,
  TabContentList,
  TabContentTitle,
  TabContentUser,
  TabContentItem,
  TabContentName,
} from './styles';
import { Avatar, Badge } from '@mui/material';
import { filteredContactChannel } from '../data';

const OnlineTab = ({ allContacts, user }) => {
  const onlineContacts = allContacts?.contacts.filter((onlContact) => onlContact.active === 'online');

  return (
    <OnlineTabContent className="onlineTab">
      <TabContentTitle className="tabContent__title">Online ({onlineContacts.length})</TabContentTitle>
      <div className="line-container">
        <div className="line"></div>
      </div>
      <TabContentContainer className="tabContent__container ">
        <TabContentList className="tabContent__list tabContent__list--square scroller">
          {onlineContacts.map((contact, i) => (
            <TabContentItem className="tabContent__item tabContent__item--square" key={i}>
              <TabContentUser className="tabContent__user">
                <Badge color="success" overlap="circular" badgeContent=" " variant="dot">
                  <Avatar />
                </Badge>
                <TabContentName className="tabContent__name">{contact.username}</TabContentName>
              </TabContentUser>
              <TabContentButtons className="tabContent__buttons">
                <Link className="circle" to={filteredContactChannel(contact._id, user._id, allContacts)}>
                  <ChatBubble />
                </Link>
                <div className="circle">
                  <Call />
                </div>
              </TabContentButtons>
            </TabContentItem>
          ))}
          <div className="scrollSpacer"></div>
        </TabContentList>
      </TabContentContainer>
    </OnlineTabContent>
  );
};

export default OnlineTab;
