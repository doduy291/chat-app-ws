import React from 'react';
import { Avatar } from '@mui/material';
import { Remove } from '@mui/icons-material';
import { BlockedTabContent } from '../styles';

const BlockedTab = () => {
  return (
    <BlockedTabContent>
      <div className="tabContent__label">Blocked (Number)</div>
      <div className="line-container">
        <div className="line"></div>
      </div>
      <div className="tabContent__container">
        <div className="tabContent__list scroller">
          {[...Array(10)].map((x, i) => (
            <div className="tabContent__item tabContent__item--spread" key={i}>
              <div className="tabContent__user tabContent__user--spread">
                <Avatar />
                <div className="tabContent__name tabContent__name--spread">Username</div>
              </div>
              <div className="tabContent__button">
                <div className="circle remove">
                  <Remove />
                </div>
              </div>
            </div>
          ))}
          <div className="scrollSpacer"></div>
        </div>
      </div>
    </BlockedTabContent>
  );
};

export default BlockedTab;
