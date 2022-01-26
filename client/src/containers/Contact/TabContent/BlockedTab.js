import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { Remove } from '@mui/icons-material';
import {
  BlockedTabContent,
  TabContentContainer,
  TabContentList,
  TabContentItem,
  TabContentUser,
  TabContentButtons,
  TabContentName,
  TabContentTitle,
} from './styles';
import { fetchGetBlockedContacts } from '../../../api/contact.api';

const BlockedTab = () => {
  const [blockedContacts, setBlockedContacts] = useState([]);

  useEffect(() => {
    fetchGetBlockedContacts(setBlockedContacts);
  }, []);

  return (
    <BlockedTabContent>
      <TabContentTitle className="tabContent__title">Blocked (Number)</TabContentTitle>
      <div className="line-container">
        <div className="line"></div>
      </div>
      <TabContentContainer className="tabContent__container">
        <TabContentList className="tabContent__list scroller">
          {blockedContacts.map((block, i) => (
            <TabContentItem className="tabContent__item tabContent__item--spread" key={i}>
              <TabContentUser className="tabContent__user tabContent__user--spread">
                <Avatar />
                <TabContentName className="tabContent__name tabContent__name--spread">{block.username}</TabContentName>
              </TabContentUser>
              <TabContentButtons className="tabContent__buttons">
                <div className="circle remove">
                  <Remove />
                </div>
              </TabContentButtons>
            </TabContentItem>
          ))}
          <div className="scrollSpacer"></div>
        </TabContentList>
      </TabContentContainer>
    </BlockedTabContent>
  );
};

export default BlockedTab;
