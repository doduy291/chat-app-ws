import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from '@mui/material';
import { Call, Videocam, PersonAdd, PersonRemove, Close, DoDisturbOnOutlined, Logout } from '@mui/icons-material';
import cn from 'classnames';
import {
  ChannelInfoWrapper,
  GeneralInfo,
  AboutInfo,
  AboutInfoItem,
  Notification,
  GeneralInfoButtons,
  GeneralInfoAvatar,
  GeneralInfoName,
} from './styles';
import SharedFiles from './SharedFiles';
import SharedImgs from './SharedImgs';
import { postSendBlock, deleteBlockedContact } from '../../../../redux/actions/contact.action';
import { clearBlockSuccess } from '../../../../redux/slices/contact.slice';
import ChatContext from '../../../../contexts/chat.context';

const ChannelInfo = React.memo(({ toggleInfo, detailChannel, setIsShown }) => {
  const { isShown } = useContext(ChatContext);
  const dispatch = useDispatch();

  const blockHandler = (contactId, isBlocked) => () => {
    dispatch(clearBlockSuccess());
    if (!isBlocked) {
      return dispatch(postSendBlock({ contactId }));
    }
    return dispatch(deleteBlockedContact({ contactId }));
  };

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
      <ChannelInfoWrapper className={cn('channel-info', { active: isShown })}>
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
          <SharedFiles detailChannel={detailChannel} />
          <div className="line"></div>

          <SharedImgs detailChannel={detailChannel} />
          <div className="line"></div>

          <Notification className="notification">
            <span>Notification</span>
            <Switch />
          </Notification>

          <div className="line"></div>
          <AboutInfoItem
            className={cn('about-info__item', { 'about-info__item--red': detailChannel.isBlocked })}
            onClick={blockHandler(
              detailChannel.channelType === 'direct' ? detailChannel.members[0]._id : detailChannel._id,
              detailChannel.isBlocked
            )}
          >
            {detailChannel.isBlocked ? <span>Unblock</span> : <span>Block</span>}
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
