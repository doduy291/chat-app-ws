import styled from '@emotion/styled';

export const ChannelInfoWrapper = styled.div`
  display: ${(props) => (props.sidebarInfo ? 'block' : 'none')};
  position: relative;
  flex: 1 1 60px;

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;

    .MuiSvgIcon-root {
      color: #9ba09e;
      font-size: 2rem;

      &:hover {
        color: var(--main-color);
      }
    }
  }
`;

export const GeneralInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;

  .general-info__avatar {
    width: 100px;
    height: 100px;
  }
  .general-info__name {
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: 10px;
  }
  .general-info__buttons {
    display: flex;
    column-gap: 20px;
    margin-top: 1.5rem;

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
      color: var(--icon-default-color);

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
  }
`;
export const AboutInfo = styled.div`
  position: relative;
  margin-top: 3rem;
  padding: 0 1.5rem;
  font-size: 14px;

  .line {
    width: 100%;
    height: 1px;
    background-color: #e9e9e9;
    margin: 10px 0;
  }
  .dot {
    width: 4px;
    height: 4px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: #cfcfcf;
  }
  .accordion-custom {
    box-shadow: none;
    border-radius: 0 !important;
  }
  .accordion-custom__summary {
    padding: 0 !important;
    min-height: 0 !important;
    color: #000;

    .MuiAccordionSummary-content {
      margin: 0 !important;
    }
    .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
      transform: rotate(90deg);
    }
  }
  .accordion-custom__details {
    padding: 0 !important;
  }
  .about-info__item {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    .MuiSvgIcon-root {
      position: absolute;
      right: 6px;
      color: #9f9f9f;
    }
    &.about-info__item--red {
      color: var(--danger-color);
      .MuiSvgIcon-root {
        color: var(--danger-color);
      }
    }
  }
`;
export const SharedFiles = styled.div`
  .shared-files__list {
    margin: 10px 0;
  }
  .shared-files__item {
    display: flex;
    align-items: center;
    margin-bottom: 3px;
  }
  .shared-files__icon {
    display: flex;
    align-items: center;
    border: 1px solid #e9e9e9;
    border-radius: 3px;
    padding: 5px;

    img {
      width: 25px;
    }
  }
  .shared-files__details {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    font-size: 13px;

    .shared-files__name {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-weight: 600;
    }

    .date-size-wrapper {
      display: flex;
      align-items: center;
      font-size: 12px;
    }
  }
  .download-icon {
    position: absolute;
    right: 0;

    .MuiSvgIcon-root {
      color: #9fa3a2;
      cursor: pointer;
      &:hover {
        color: var(--main-brighter-color);
      }
    }
  }
`;
export const SharedImgs = styled.div`
  .shared-imgs__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 100px;
    grid-gap: 3px 3px;
    margin: 10px 0;
  }
  .shared-imgs__item {
    display: flex;
    width: 100%;
    height: 100%;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: 1px solid #e3e3e3;
    }
  }
`;
export const Notification = styled.div`
  position: relative;
  .MuiSwitch-root {
    position: absolute;
    top: -10px;
    bottom: 0;
    right: 0;
    width: 52px;
    height: 42px;
    padding-right: 6px;
  }
  .MuiSwitch-switchBase {
    top: 4px;
    left: 4px;
  }
  .Mui-checked {
    color: var(--main-color) !important;
    left: 0px !important;

    & + .MuiSwitch-track {
      background-color: var(--main-lighter-color) !important;
    }
  }
  .MuiSwitch-thumb {
    width: 16px;
    height: 16px;
  }
  .MuiSwitch-track {
    border-radius: 10px;
  }
`;
