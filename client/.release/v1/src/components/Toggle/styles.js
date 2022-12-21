import styled from '@emotion/styled';
import { Switch } from '@mui/material';

export const ToggleSwitch = styled(Switch)`
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
