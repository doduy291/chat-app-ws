import React from 'react';
import { Link } from 'react-router-dom';
import { Forum, Settings, ContactPage } from '@mui/icons-material';
import { NavWrapper, NavLogo, NavMenu } from './styles';
import logo from '../../assets/images/logo.png';

const menuItems = [
  { icon: <Forum />, title: 'Home', active: '', url: '/' },
  { icon: <ContactPage />, title: 'Contact', active: true, url: '/contact' },
  { icon: <Settings />, title: 'Settings', active: '', url: '/setting' },
];

const Navigation = () => {
  return (
    <>
      <NavWrapper className="nav">
        <NavLogo className="nav__logo">
          <img src={logo} alt="" />
        </NavLogo>
        <NavMenu className="nav__menu">
          <div className="nav__menu-items">
            {menuItems.map((item, index) => (
              <Link className={`nav__link${item.active && ' active'}`} key={index} to={item.url}>
                <div className="nav__icon">{item.icon}</div>
                {/* <span className="sidebar__menu-title">{item.title}</span> */}
              </Link>
            ))}
          </div>
        </NavMenu>
      </NavWrapper>
    </>
  );
};

export default Navigation;
