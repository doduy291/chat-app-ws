import styled from '@emotion/styled';

export const ContactTab = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
`;
export const ContactHeader = styled.div`
  padding: 0 24px;
  border-bottom: 1px solid var(--border-color);
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
    color: var(--font-default-color);

    &:hover {
      background-color: var(--main-lighter-color2);
    }
    &.Mui-selected {
      color: #fff !important;
      background-color: var(--main-color);
    }
  }
`;
export const ContactTabContent = styled.div`
  flex: 1 1 auto;
  background-color: var(--background-color2);
`;
