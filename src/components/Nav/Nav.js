import React from 'react';
import Search from './Search';
// import logo from './logo.png';

const Nav = ({ handleButtonClick }) => (
  <nav className="navbar">
    <div className="navbarFirst">
      <div className="navbar-left">
        <i className="fas fa-bars"></i>
        {/* <div className="logo" alt="" /> */}
        <i className="fab fa-youtube"><span></span></i>
      </div>
      <Search handleButtonClick={handleButtonClick} />
      <div className="nav-icons">
        <i className="fas fa-video"></i>
        <i className="fas fa-th"></i>
        <i className="fas fa-bell"></i>
        <i className="fas fa-user-circle"></i>
      </div>
    </div>
  </nav>
);

export default Nav;
