import React from 'react';
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

const OnlineTab = ({ contacts }) => {
  const onlineContacts = contacts.filter((onlContact) => onlContact.active === 'online');

  return (
    <OnlineTabContent className="onlineTab">
      <TabContentTitle className="tabContent__title">Online ({onlineContacts.length})</TabContentTitle>
      <div className="line-container">
        <div className="line"></div>
      </div>
      <TabContentContainer className="tabContent__container ">
        <TabContentList className="tabContent__list tabContent__list--square scroller">
          {[...Array(1)].map((contact, i) => (
            <TabContentItem className="tabContent__item tabContent__item--square" key={i}>
              <TabContentUser className="tabContent__user">
                <Badge color="success" overlap="circular" badgeContent=" " variant="dot">
                  <Avatar />
                </Badge>
                <TabContentName className="tabContent__name">Username</TabContentName>
              </TabContentUser>
              <TabContentButtons className="tabContent__buttons">
                <div className="circle">
                  <ChatBubble />
                </div>
                <div className="circle">
                  <Call />
                </div>
              </TabContentButtons>
            </TabContentItem>
          ))}
          {/* {onlineContacts.map((contact, i) => (
            <TabContentItem className="tabContent__item tabContent__item--square" key={i}>
              <TabContentUser className="tabContent__user">
                <Badge color="success" overlap="circular" badgeContent=" " variant="dot">
                  <Avatar />
                </Badge>
                <TabContentName className="tabContent__name">{contact.username}</TabContentName>
              </TabContentUser>
              <TabContentButtons className="tabContent__buttons">
                <div className="circle">
                  <ChatBubble />
                </div>
                <div className="circle">
                  <Call />
                </div>
              </TabContentButtons>
            </TabContentItem>
          ))} */}
          <div className="scrollSpacer"></div>
        </TabContentList>
      </TabContentContainer>
    </OnlineTabContent>
  );
};

export default OnlineTab;
