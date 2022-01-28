import React from 'react';
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
import { useGetBlockedContacts } from '../../../services/contact.api';

const BlockedTab = () => {
  const { data } = useGetBlockedContacts();

  return (
    <BlockedTabContent>
      <TabContentTitle className="tabContent__title">Blocked (Number)</TabContentTitle>
      <div className="line-container">
        <div className="line"></div>
      </div>
      <TabContentContainer className="tabContent__container">
        <TabContentList className="tabContent__list scroller">
          {data?.length <= 0 ? (
            <div>Nothing</div>
          ) : (
            data.map((block, i) => (
              <TabContentItem className="tabContent__item tabContent__item--spread" key={i}>
                <TabContentUser className="tabContent__user tabContent__user--spread">
                  <Avatar />
                  <TabContentName className="tabContent__name tabContent__name--spread">
                    {block.username}
                  </TabContentName>
                </TabContentUser>
                <TabContentButtons className="tabContent__buttons">
                  <div className="circle remove">
                    <Remove />
                  </div>
                </TabContentButtons>
              </TabContentItem>
            ))
          )}
          <div className="scrollSpacer"></div>
        </TabContentList>
      </TabContentContainer>
    </BlockedTabContent>
  );
};

export default BlockedTab;
