import React from 'react';
import { ChatBubble, Call } from '@mui/icons-material';
import { OnlineTabContent } from '../styles';
import { Avatar } from '@mui/material';

const OnlineTab = () => {
  return (
    <OnlineTabContent className="onlineTab">
      <div className="tabContent__label">Online (Number)</div>
      <div className="line-container">
        <div className="line"></div>
      </div>
      <div className="tabContent__container ">
        <div className="tabContent__list tabContent__list--online scroller">
          {[...Array(15)].map((x, i) => (
            <div className="tabContent__item tabContent__item--online" key={i}>
              <div className="tabContent__user">
                <Avatar />
                <div className="tabContent__name">Username</div>
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
