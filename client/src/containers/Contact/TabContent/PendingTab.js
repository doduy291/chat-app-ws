import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { Close, Check } from '@mui/icons-material';
import {
  PendingTabContent,
  TabContentItem,
  TabContentList,
  TabContentName,
  TabContentUser,
  TabContentButtons,
  TabContentContainer,
  TabContentTitle,
} from './styles';
import { postAcceptRequest, deletePendingRequest } from '../../../redux/actions/contact.action';
import { fetchGetPendingRequests } from '../../../api/contact.api';

const PendingTab = () => {
  const { success } = useSelector((state) => state.contact);
  const [pendings, setPendings] = useState();
  console.count('pending');
  const dispatch = useDispatch();

  const acceptHandler = (requesterId) => (e) => {
    e.preventDefault();
    dispatch(postAcceptRequest({ requesterId }));
  };
  const removeHandler = (requesterId) => (e) => {
    e.preventDefault();
    dispatch(deletePendingRequest({ requesterId }));
  };

  useEffect(() => {
    fetchGetPendingRequests(setPendings);
    return () => {};
    // success: re-render when clicking accept or remove pending request successfully
  }, [success]);
  return (
    <>
      <PendingTabContent className="tabContent__pending">
        <TabContentTitle className="tabContent__title">Pending (Number)</TabContentTitle>
        <div className="line-container">
          <div className="line"></div>
        </div>
        <TabContentContainer className="tabContent__container">
          <TabContentList className="tabContent__list scroller">
            {!pendings ? (
              <div>Nothing</div>
            ) : (
              pendings.map((element, i) => (
                <TabContentItem className="tabContent__item tabContent__item--spread" key={i}>
                  <TabContentUser className="tabContent__user tabContent__user--spread">
                    <Avatar />
                    <TabContentName className="tabContent__name tabContent__name--spread">
                      {element.requester.username}
                    </TabContentName>
                  </TabContentUser>
                  <TabContentButtons className="tabContent__buttons">
                    <div className="circle" onClick={acceptHandler(element.requester._id)}>
                      <Check />
                    </div>
                    <div className="circle remove" onClick={removeHandler(element.requester._id)}>
                      <Close />
                    </div>
                  </TabContentButtons>
                </TabContentItem>
              ))
            )}
            <div className="scrollSpacer"></div>
          </TabContentList>
        </TabContentContainer>
      </PendingTabContent>
    </>
  );
};

export default PendingTab;
