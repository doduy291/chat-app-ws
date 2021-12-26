import React from 'react';
import { useSelector } from 'react-redux';
import { Switch } from '@mui/material';
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
  PersonAddDisabled,
  Logout,
} from '@mui/icons-material';
import {
  ChannelInfoWrapper,
  GeneralInfo,
  AboutInfo,
  AboutInfoItem,
  Notification,
  GeneralInfoButtons,
  GeneralInfoAvatar,
  GeneralInfoName,
  SharedFilesList,
  SharedFilesItem,
  SharedFilesIcon,
  SharedFilesDetails,
  SharedFilesName,
  SharedImgsList,
  SharedImgsItem,
  AccordionCustom,
  AccordionCustomSummary,
  AccordionCustomDetails,
} from './styles';

import icon from '../../../../assets/file-icons/pdf.png';

import img1 from '../../../../assets/shared-imgs/shared-imgs-1.jpg';

const ChannelInfo = React.memo(({ isShown, toggleInfo, detailChannel }) => {
  return (
    <>
      <ChannelInfoWrapper className="channel-info" sidebarInfo={isShown}>
        <div className="close" onClick={toggleInfo(false)}>
          <Close />
        </div>
        <GeneralInfo className="general-info">
          <GeneralInfoAvatar className="general-info__avatar" />
          <GeneralInfoName className="general-info__name">
            {detailChannel.channelType === 'direct' ? detailChannel.members[0].username : detailChannel.channelName}
          </GeneralInfoName>
          <GeneralInfoButtons className="general-info__buttons">
            {detailChannel.channelType === 'direct' && detailChannel.isFriend && (
              <div className="circle remove">
                <PersonRemove />
              </div>
            )}
            {detailChannel.channelType === 'direct' && !detailChannel.isFriend && (
              <div className="circle">
                <PersonAdd />
              </div>
            )}

            <div className="circle">
              <Call />
            </div>
            <div className="circle">
              <Videocam />
            </div>
          </GeneralInfoButtons>
        </GeneralInfo>

        <AboutInfo className="about-info">
          <div className="shared-files">
            <AccordionCustom className="accordion-custom">
              <AccordionCustomSummary className="accordion-custom__summary" expandIcon={<KeyboardArrowRight />}>
                Shared Files
              </AccordionCustomSummary>
              <AccordionCustomDetails className="accordion-custom__details">
                <SharedFilesList className="shared-files__list">
                  {[...Array(3)].map((el, i) => (
                    <SharedFilesItem className="shared-files__item" key={i}>
                      <SharedFilesIcon className="shared-files__icon">
                        <img src={icon} alt="" />
                      </SharedFilesIcon>
                      <SharedFilesDetails className="shared-files__details">
                        <SharedFilesName className="shared-files__name">name</SharedFilesName>
                        <div className="date-size-wrapper">
                          <div className="shared-files__date">12 Aug 2021</div>
                          <div className="dot"></div>
                          <div className="shared-files__size">123.4 KB</div>
                        </div>
                      </SharedFilesDetails>
                      <div className="download-icon">
                        <Download />
                      </div>
                    </SharedFilesItem>
                  ))}
                </SharedFilesList>
              </AccordionCustomDetails>
            </AccordionCustom>
          </div>

          <div className="line"></div>
          <div className="shared-imgs">
            <AccordionCustom className="accordion-custom">
              <AccordionCustomSummary className="accordion-custom__summary" expandIcon={<KeyboardArrowRight />}>
                Shared Images
              </AccordionCustomSummary>
              <AccordionCustomDetails className="accordion-custom__details">
                <SharedImgsList className="shared-imgs__list">
                  {[...Array(5)].map((el, i) => (
                    <SharedImgsItem className="shared-imgs__item" key={i}>
                      <img src={img1} alt="" />
                    </SharedImgsItem>
                  ))}
                </SharedImgsList>
              </AccordionCustomDetails>
            </AccordionCustom>
          </div>

          <div className="line"></div>
          <Notification className="notification">
            <span>Notification</span>
            <Switch />
          </Notification>

          <div className="line"></div>
          <AboutInfoItem className="about-info__item">
            <span>Block</span>
            <DoDisturbOnOutlined />
          </AboutInfoItem>

          <div className="line"></div>
          {detailChannel.channelType === 'direct' ? (
            ''
          ) : (
            <AboutInfoItem className="about-info__item about-info__item--red">
              <span>Leave the channel</span>
              <Logout />
            </AboutInfoItem>
          )}
        </AboutInfo>
      </ChannelInfoWrapper>
    </>
  );
});

export default ChannelInfo;
