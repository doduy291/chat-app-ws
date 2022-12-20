import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const ContactSidebar = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 330px;
  border-right: 1px solid var(--border-color);
  background-color: var(--background-color2);
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
  padding: 0 24px;

  input {
    width: 100%;
    border-radius: 4px;
    border: none;
    padding: 5px;
    padding-left: 2.2rem;
    background-color: var(--main-lighter-color2);
    color: var(--font-default-color);

    &::placeholder {
      color: var(--icon-default-color);
    }
  }

  .MuiSvgIcon-root {
    position: absolute;
    left: 2rem;
    color: var(--icon-default-color);
  }
`;

export const SidebarList = styled.div`
  position: relative;
  margin-top: 1rem;
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

export const SidebarItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px 24px;
  border-top: 1px solid var(--border-color2);
  cursor: pointer;

  span {
    font-size: 14px;
    margin-left: 10px;
  }

  &:hover {
    background-color: var(--main-lighter-color2);
  }
  &:last-child {
    border-bottom: 1px solid var(--border-color2);
  }
`;

export const SidebarAddContact = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;
export const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 5px;
  padding: 5px;
  color: #fff;
  background-color: var(--main-color);
  cursor: pointer;

  &:hover {
    background-color: var(--main-brighter-color);
  }

  span {
    font-size: 14px;
    font-weight: 500;
  }
`;
