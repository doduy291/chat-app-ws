import React, { useEffect } from 'react';
import { Switch, Tooltip } from '@mui/material';
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
  InsertDriveFile,
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
import { imgOptimize } from '../../../../utils/cloudinaryImgOptimize';
import { formatFromByte, formatToDate } from '../../../../utils/format';
import { fileIconConst } from '../../../../constants/icons';
import { enumTypes } from '../../../../validation/checkFile.validation';

const ChannelInfo = React.memo(({ isShown, toggleInfo, detailChannel, setIsShown }) => {
  console.log('channelInfo');
  useEffect(() => {
    const conversation = document.querySelector('.conversation');

    const updateSidebar = (e) => {
      if (conversation?.offsetWidth <= 400) {
        setIsShown(false);
      }
    };
    window.addEventListener('resize', updateSidebar);
    return () => window.removeEventListener('resize', updateSidebar);
  }, [setIsShown]);
  return (
    <>
      <ChannelInfoWrapper className={`channel-info ${isShown ? 'active' : ''}`} sidebarInfo={isShown}>
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
                  {detailChannel.sharedFiles.map((item, i) => (
                    <SharedFilesItem className="shared-files__item" key={i}>
                      <SharedFilesIcon className="shared-files__icon">
                        <div className="icon-img-container">
                          {!enumTypes.toLowerCase().includes(item.filename.split('.').pop()) ? (
                            <InsertDriveFile />
                          ) : (
                            <img src={fileIconConst[item.filename.split('.').pop()]} alt="" />
                          )}
                        </div>
                      </SharedFilesIcon>
                      <SharedFilesDetails className="shared-files__details">
                        <Tooltip title={item.filename}>
                          <SharedFilesName className="shared-files__name">{item.filename}</SharedFilesName>
                        </Tooltip>
                        <div className="date-size-wrapper">
                          <div className="shared-files__date">{formatToDate(item.created_at)}</div>
                          <div className="dot"></div>
                          <div className="shared-files__size">{formatFromByte(item.size)}</div>
                        </div>
                      </SharedFilesDetails>
                      <a className="download-icon" href={item.url} target="_blank" rel="noreferrer">
                        <Download />
                      </a>
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
                  {detailChannel.sharedImages.reverse().map((item, i) => (
                    <SharedImgsItem className="shared-imgs__item" key={i}>
                      <div className="img-item-wrapper">
                        <div className="img-item-container">
                          <a href={item.url} target="_blank" rel="noreferrer">
                            <img src={imgOptimize(item.url, 'sharedImg')} alt="" />
                          </a>
                        </div>
                      </div>
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
