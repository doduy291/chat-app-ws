import styled from '@emotion/styled';

export const OnlineTabContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const PendingTabContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const BlockedTabContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const TabContentTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  padding: 0 24px;
  margin: 10px 0;
`;
export const TabContentContainer = styled.div`
  position: relative;
  height: 100%;
  margin-top: 10px;
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
    position: absolute;
    right: 0;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: #e1e4ea;
  }
  &::-webkit-scrollbar-track {
    background: #f1f2f3;
    border-radius: 6px;
  }
`;
export const TabContentList = styled.div`
  padding-left: 24px;
  padding-right: calc(24px - 0.5em);
  padding-bottom: 2rem;

  &.tabContent__list--square {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: minmax(170px, 220px);
    grid-gap: 10px;
  }
  &.scroller {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

export const TabContentItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: var(--background-color2);
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;

  &.tabContent__item--spread {
    flex-direction: row;
    justify-content: space-between;
  }
  &.tabContent__item--square {
    margin-bottom: 0;
    justify-content: center;
  }
  &:hover {
    background-color: var(--main-lighter-color2);
  }
`;

export const TabContentUser = styled.div`
  text-align: center;

  &.tabContent__user--spread {
    display: flex;
    align-items: center;
  }
  .MuiAvatar-root {
    margin: 0 auto;
  }
`;
export const TabContentName = styled.div`
  font-size: 15px;
  margin-top: 5px;
  &.tabContent__name--spread {
    margin-left: 10px;
  }
`;

export const TabContentButtons = styled.div`
  display: flex;
  margin-top: 5px;
  gap: 10px;

  .MuiSvgIcon-root {
    font-size: 20px;
  }
`;
