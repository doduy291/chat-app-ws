import styled from '@emotion/styled';

export const NavWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  min-width: 70px;
  min-height: 100%;
  background: var(--background-color);
  border-right: 1px solid var(--border-color);
`;
export const NavLogo = styled.div`
  flex: 0.2;
  padding-top: 2rem;
  margin: 0 auto;

  img {
    width: 40px;
  }
`;
export const NavMenu = styled.div`
  width: 100%;
  .nav__menu-items {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
  .nav__link {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 13px 0;

    &.active {
      border-right: 2px solid #1ebf7b;

      .MuiSvgIcon-root {
        color: var(--main-color);
        margin-left: 2px;
      }
    }
  }
  .nav__icon {
    display: flex;
    align-items: center;
  }
  .MuiSvgIcon-root {
    font-size: 30px;
    color: var(--icon-default-color);

    &:hover {
      color: var(--main-color);
    }
  }
`;

export const NavLogout = styled.div`
  display: flex;
  justify-content: center;
  padding: 13px 0;
  margin-top: 20px;

  .logout-icon {
    color: var(--icon-default-color);
    font-size: 30px;
    cursor: pointer;

    &:hover {
      color: var(--danger-color);
    }
  }
`;

export const NavToggle = styled.div`
  position: absolute;
  bottom: 1rem;

  .MuiSwitch-root {
    width: 65px;
    height: 46px;
  }

  .MuiSwitch-switchBase {
    top: 2px !important;
    left: 4px !important;

    &.Mui-checked {
      transform: translateX(18px);
    }
  }
  .MuiSwitch-thumb {
    width: 20px !important;
    height: 24px !important;
    box-shadow: none;
    background-color: unset;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;
