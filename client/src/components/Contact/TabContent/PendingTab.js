import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { Close, Check } from '@mui/icons-material';
import { PendingTabContent } from '../styles';
import { getPendingRequest, postAcceptRequest } from '../../../redux/actions/contact.action';

const PendingTab = () => {
  const { pendings, success } = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPendingRequest());
  }, [dispatch]);

  // re-render when clicking accept, remove
  useEffect(() => {}, [success]);

  // TODO : Try using useCallback
  const acceptHandler = (requesterId) => (e) => {
    e.preventDefault();
    dispatch(postAcceptRequest({ requesterId }));
  };
  return (
    <PendingTabContent className="tabContent__pending">
      <div className="tabContent__label">Pending (Number)</div>
      <div className="line-container">
        <div className="line"></div>
      </div>
      <div className="tabContent__container">
        <div className="tabContent__list scroller">
          {!pendings ? (
            <div>Nothing</div>
          ) : (
            pendings.map((element, i) => (
              <div className="tabContent__item tabContent__item--spread" key={i}>
                <div className="tabContent__user tabContent__user--spread">
                  <Avatar />
                  <div className="tabContent__name tabContent__name--spread">{element.requester.username}</div>
                </div>
                <div className="tabContent__button">
                  <div className="circle" onClick={acceptHandler(element.requester._id)}>
                    <Check />
                  </div>
                  <div className="circle remove">
                    <Close />
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="scrollSpacer"></div>
        </div>
      </div>
    </PendingTabContent>
  );
};

export default PendingTab;
