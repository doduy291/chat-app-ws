import styled from '@emotion/styled';

export const NavWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  min-width: 70px;
  min-height: 100%;
  background: #fafafa;
  border-right: 1px solid #e5e5e5;
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
    color: #9ba09e;

    &:hover {
      color: var(--main-color);
    }
  }
`;
