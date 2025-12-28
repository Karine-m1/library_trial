import React from "react";
import { NavLink } from "react-router-dom";
import imageSrcc from './digital-library.png';

import "./NavBar.css";
// export function NavBar(){
  interface NavBarProps {
    setToken: React.Dispatch<React.SetStateAction<string|null>>;

    backgroundImage: string;
  }
  
  const NavBar: React.FC<NavBarProps> = ({ setToken, backgroundImage }) => {

  const logOutHandler = () => {
    setToken("");
    localStorage.clear();
  }
    return(
      <nav className="navbar-container" style={{ backgroundImage }}>
        <div className="text-nav">
        <img src={imageSrcc} alt="Book Library" className="home-image-nav" />
        <p>. Bookify</p>
        </div>
      {/* <FaSchool className="icon"></FaSchool> */}
      <div className="mainNav">
      <NavLink to="/home" className="nav-linkk">
        Home
      </NavLink>
        
        <NavLink to="/BookList" className="nav-linkk">
        BookList
        </NavLink>
        {/* Add the Register link */}
      <NavLink to="/register" className="nav-linkk">
        Register
      </NavLink>
      <NavLink to="/contact" className="nav-linkk">
        Contact Us
        </NavLink>
        </div>
        <div className="endNav">
        <NavLink to="/login" className="log-in-btn">
        <button className="log-in-btn" >Log In</button>
        </NavLink>
        </div>

        {/* <button className="log-out-btn" onClick={()=>logOutHandler()}>Log Out</button> */}
        
    </nav>
    );
};

export default NavBar