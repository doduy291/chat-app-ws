import styled from '@emotion/styled';

export const ContactSidebar = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 330px;
  border-right: 1px solid #e5e5e5;
`;
export const SidebarTitle = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  font-size: 1.3rem;
  font-weight: 500;
  padding: 0 24px;

  .count {
    font-size: 15px;
    text-align: center;
    margin-left: 10px;
    border-radius: 10px;
    padding: 0 10px;
    background-color: var(--main-lighter-color2);
  }

  .MuiSvgIcon-root {
    margin-left: 10px;
    color: var(--icon-default-color);
  }
`;
export const SidebarSearch = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  top: -10px;
  padding: 0 24px;

  input {
    width: 100%;
    border-radius: 4px;
    border: none;
    padding: 5px;
    padding-left: 2.2rem;
    background-color: rgba(0, 0, 0, 0.07);
  }

  .MuiSvgIcon-root {
    position: absolute;
    left: 2rem;
    color: var(--icon-default-color);
  }
`;

export const SidebarList = styled.div`
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
`;

export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 24px;
  border-top: 1px solid #e5e5e5;
  cursor: pointer;

  span {
    font-size: 14px;
    margin-left: 10px;
  }

  &:hover {
    background-color: var(--main-lighter-color2);
  }
  &:last-child {
    border-bottom: 1px solid #e5e5e5;
  }
`;
