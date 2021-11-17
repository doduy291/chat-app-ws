import React from 'react';
import { Avatar, Accordion, AccordionSummary, AccordionDetails, Switch } from '@mui/material';
import {
  Call,
  Videocam,
  PersonAdd,
  PersonRemove,
  Close,
  KeyboardArrowRight,
  Download,
  DoDisturbOnOutlined,
  DoDisturbOffOutlined,
  Logout,
} from '@mui/icons-material';
import { ChannelInfoWrapper, GeneralInfo, AboutInfo, SharedFiles, SharedImgs, Notification } from './styles';
import icon from '../../../assets/file-icons/pdf.png';

import img1 from '../../../assets/shared-imgs/shared-imgs-1.jpg';
import img3 from '../../../assets/shared-imgs/shared-imgs-2.jpg';
import img2 from '../../../assets/shared-imgs/shared-imgs-3.jpg';
import img4 from '../../../assets/shared-imgs/shared-imgs-4.jpg';

const ChatChannelInfo = ({ isShowed }) => {
  return (
    <ChannelInfoWrapper className="channel-info" sidebarInfo={isShowed.showSidebarInfo}>
      <div className="close" onClick={() => isShowed.setShowSidebarInfo(false)}>
        <Close />
      </div>
      <GeneralInfo className="general-info">
        <Avatar className="general-info__avatar" />
        <div className="general-info__name">Channel Name</div>
        <div className="general-info__buttons">
          <div className="circle fill person-remove">
            <PersonRemove />
          </div>
          <div className="circle fill">
            <Call />
          </div>
          <div className="circle fill">
            <Videocam />
          </div>
        </div>
      </GeneralInfo>
      <AboutInfo className="about-info">
        <SharedFiles className="shared-files">
          <Accordion className="accordion-custom">
            <AccordionSummary className="accordion-custom__summary" expandIcon={<KeyboardArrowRight />}>
              Shared Files
            </AccordionSummary>
            <AccordionDetails className="accordion-custom__details">
              <div className="shared-files__list">
                <div className="shared-files__item">
                  <div className="shared-files__icon">
                    <img src={icon} alt="" />
                  </div>
                  <div className="shared-files__details">
                    <div className="shared-files__name">name</div>
                    <div className="date-size-wrapper">
                      <div className="shared-files__date">12 Aug 2021</div>
                      <div className="dot"></div>
                      <div className="shared-files__size">123.4 KB</div>
                    </div>
                  </div>
                  <div className="download-icon">
                    <Download />
                  </div>
                </div>
                <div className="shared-files__item">
                  <div className="shared-files__icon">
                    <img src={icon} alt="" />
                  </div>
                  <div className="shared-files__details">
                    <div className="shared-files__name">name</div>
                    <div className="date-size-wrapper">
                      <div className="shared-files__date">12 Aug 2021</div>
                      <div className="dot"></div>
                      <div className="shared-files__size">123.4 KB</div>
                    </div>
                  </div>
                  <div className="download-icon">
                    <Download />
                  </div>
                </div>
                <div className="shared-files__item">
                  <div className="shared-files__icon">
                    <img src={icon} alt="" />
                  </div>
                  <div className="shared-files__details">
                    <div className="shared-files__name">name</div>
                    <div className="date-size-wrapper">
                      <div className="shared-files__date">12 Aug 2021</div>
                      <div className="dot"></div>
                      <div className="shared-files__size">123.4 KB</div>
                    </div>
                  </div>
                  <div className="download-icon">
                    <Download />
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </SharedFiles>
        <div className="line"></div>
        <SharedImgs className="shared-imgs">
          <Accordion className="accordion-custom">
            <AccordionSummary className="accordion-custom__summary" expandIcon={<KeyboardArrowRight />}>
              Shared Images
            </AccordionSummary>
            <AccordionDetails className="accordion-custom__details">
              <div className="shared-imgs__list">
                <div className="shared-imgs__item">
                  <img src={img1} alt="" />
                </div>
                <div className="shared-imgs__item">
                  <img src={img2} alt="" />
                </div>
                <div className="shared-imgs__item">
                  <img src={img3} alt="" />
                </div>
                <div className="shared-imgs__item">
                  <img src={img4} alt="" />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </SharedImgs>
        <div className="line"></div>
        <Notification className="notification">
          <span>Notification</span>
          <Switch />
        </Notification>
        <div className="line"></div>
        <div className="about-info__item">
          <span>Block</span>
          <DoDisturbOnOutlined />
        </div>
        <div className="line"></div>
        <div className="about-info__item about-info__item--red">
          <span>Leave the channel</span>
          <Logout />
        </div>
      </AboutInfo>
    </ChannelInfoWrapper>
  );
};

export default ChatChannelInfo;
