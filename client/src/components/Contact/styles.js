import styled from '@emotion/styled';

export const ContactWrapper = styled.div`
  display: flex;
  width: 100%;

  .line-container {
    padding: 0 24px;
  }
  .line {
    width: 100%;
    height: 1px;
    background-color: #e5e5e5;
  }
  .circle {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #ebebeb;
    cursor: pointer;
    transition: 0.4s;
    color: #666666;
    background-color: #d3d3d3;

    &:hover {
      border: 1px solid var(--main-color);
      color: #fff;
      box-shadow: inset 0 0 0 2em var(--main-color);
    }
    &.remove:hover {
      box-shadow: inset 0 0 0 2em var(--danger-color);
      border: 1px solid var(--danger-color);
    }
  }
  .scrollSpacer {
    display: block;
    height: 30px;
    width: 100%;
  }
`;

export const ContactSidebar = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 330px;
  border-right: 1px solid #e5e5e5;

  .contact-sidebar__title {
    display: flex;
    align-items: center;
    height: 80px;
    font-size: 1.3rem;
    font-weight: 500;
    padding: 0 24px;

    .MuiSvgIcon-root {
      margin-left: 10px;
      color: var(--icon-default-color);
    }
  }
  .contact-sidebar__search {
    display: flex;
    align-items: center;
    position: relative;
    top: -10px;
    padding: 0 24px;

    .MuiSvgIcon-root {
      position: absolute;
      left: 2rem;
      color: var(--icon-default-color);
    }
  }
  .contact-sidebar__input {
    width: 100%;
    border-radius: 4px;
    border: none;
    padding: 5px;
    padding-left: 2.2rem;
    background-color: rgba(0, 0, 0, 0.07);
  }
  .contact-sidebar__list {
    position: relative;
    margin-top: 2rem;
    overflow-y: scroll;
    overflow-x: hidden;
    flex: 1 1 auto;

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
  }
  .contact-sidebar__item {
    display: flex;
    align-items: center;
    padding: 10px 24px;
    border-top: 1px solid #e5e5e5;
    cursor: pointer;

    .contact-sidebar__name {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      background-color: var(--main-lighter-color2);
    }
    &:last-child {
      border-bottom: 1px solid #e5e5e5;
    }
  }
`;
export const ContactTab = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
`;
export const ContactHeader = styled.div`
  padding: 0 24px;
  border-bottom: 1px solid #e5e5e5;
  background-color: var(--background-color);
  flex: 0 1 auto;

  .MuiTabs-root {
    align-items: center;
  }
  .MuiButtonBase-root {
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    max-width: max-content;
    min-width: auto;
    min-height: auto;
    padding: 2px 7px;
    border-radius: 5px;
    text-transform: none;
    margin-right: 15px;

    &:hover {
      background-color: var(--main-lighter-color2);
    }
    &.Mui-selected {
      color: #fff;
      background-color: var(--main-color);
    }
  }
`;
export const ContactTabContent = styled.div`
  flex: 1 1 auto;

  .tabContent__container {
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
  }
  .tabContent__list {
    padding-left: 24px;
    padding-right: calc(24px - 0.5em);
    padding-bottom: 2rem;

    &.tabContent__list--online {
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
  }

  .tabContent__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: var(--background-color2);
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;

    &.tabContent__item--pending {
      flex-direction: row;
      justify-content: space-between;
    }
    &.tabContent__item--online {
      margin-bottom: 0;
      justify-content: center;
    }
    &:hover {
      background-color: var(--main-lighter-color2);
    }
  }
  .tabContent__user {
    &.tabContent__user--pending {
      display: flex;
      align-items: center;
    }
    .MuiAvatar-root {
      margin: 0 auto;
    }
  }
  .tabContent__name {
    font-size: 15px;
    margin-top: 5px;
    &.tabContent__name--pending {
      margin-left: 10px;
    }
  }
  .tabContent__button {
    display: flex;
    margin-top: 5px;
    gap: 10px;

    .MuiSvgIcon-root {
      font-size: 20px;
    }
  }
  .tabContent__label {
    font-size: 14px;
    font-weight: 500;
    padding: 0 24px;
    margin: 10px 0;
  }
`;

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
