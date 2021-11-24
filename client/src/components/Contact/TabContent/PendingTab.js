import React from 'react';
import { Avatar } from '@mui/material';
import { Close, Check } from '@mui/icons-material';
import { PendingTabContent } from '../styles';

const PendingTab = () => {
  return (
    <PendingTabContent className="tabContent__pending">
      <div className="tabContent__label">Pending (Number)</div>
      <div className="line-container">
        <div className="line"></div>
      </div>
      <div className="tabContent__container">
        <div className="tabContent__list scroller">
          {[...Array(10)].map((x, i) => (
            <div className="tabContent__item tabContent__item--pending" key={i}>
              <div className="tabContent__user tabContent__user--pending">
                <Avatar />
                <div className="tabContent__name tabContent__name--pending">Username</div>
              </div>
              <div className="tabContent__button">
                <div className="circle">
                  <Check />
                </div>
                <div className="circle remove">
                  <Close />
                </div>
              </div>
            </div>
          ))}
          <div className="scrollSpacer"></div>
        </div>
      </div>
    </PendingTabContent>
  );
};

export default PendingTab;
