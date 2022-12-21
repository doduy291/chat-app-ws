import React from 'react';
import { ToggleSwitch } from './styles';

const Toggle = ({ toggleHandler, themeMode }) => {
  return <ToggleSwitch onChange={toggleHandler} checked={themeMode} />;
};

export default Toggle;
