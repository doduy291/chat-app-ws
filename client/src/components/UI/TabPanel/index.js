import React from 'react';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabBody-${index}`}
      aria-labelledby={`tabBody-${index}`}
      {...other}
      style={{ height: '100%' }}
    >
      {value === index && children}
    </div>
  );
};

export default TabPanel;
