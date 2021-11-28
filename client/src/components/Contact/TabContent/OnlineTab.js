import React, { useEffect } from 'react';
import { ChatBubble, Call } from '@mui/icons-material';
import { OnlineTabContent } from '../styles';
import { Avatar, Badge } from '@mui/material';

const OnlineTab = ({ contacts }) => {
  const onlineContacts = contacts.filter((onlContact) => onlContact.active === 'online');

  return (
    <OnlineTabContent className="onlineTab">
      <div className="tabContent__label">Online ({onlineContacts.length})</div>
      <div className="line-container">
        <div className="line"></div>
      </div>
      <div className="tabContent__container ">
        <div className="tabContent__list tabContent__list--square scroller">
          {onlineContacts.map((contact, i) => (
            <div className="tabContent__item tabContent__item--square" key={i}>
              <div className="tabContent__user">
                <Badge color="success" overlap="circular" badgeContent=" " variant="dot">
                  <Avatar />
                </Badge>
                <div className="tabContent__name">{contact.username}</div>
              </div>
              <div className="tabContent__button">
                <div className="circle">
                  <ChatBubble />
                </div>
                <div className="circle">
                  <Call />
                </div>
              </div>
            </div>
          ))}
          <div className="scrollSpacer"></div>
        </div>
      </div>
    </OnlineTabContent>
  );
};

export default OnlineTab;
