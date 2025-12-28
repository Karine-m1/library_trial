import React, { useEffect, useState } from "react";

import axios from "axios";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../pages/navbar/MyBooks/context/authContext";
import imageSrcc from './digital-library.png';
import "./navbar2.css";

// export function NavBar(){
  interface NavBar2Props {
    setToken: React.Dispatch<React.SetStateAction<string|null>>;
  }
  
  interface User {
    firstName:string;
    lastName:string
  }

  const NavBar2: React.FC<NavBar2Props> = ({ setToken }) => {
    const [user, setUser] = useState<User>();
    const { userId, logout } = useAuth(); // Destructure userId and logout from the context
    console.log("in navbar:",userId);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        // Set a threshold value as needed
        const scrollThreshold = 100;
        setIsScrolled(scrollPosition > scrollThreshold);
      };
      
      axios
      .get(`http://localhost:8081/api/v1/user/getUser/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));

      axios
      .get(`http://localhost:8081/api/v1/user/getFullName/${userId}`)
      .then((res) => {
        userId === res.data.id;
        console.log(res.data);
      })
      .catch((err) => console.log(err));
      
      // Attach the event listener when the component mounts
      window.addEventListener("scroll", handleScroll);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };

    }, [userId]);
    
  const logOutHandler = () => {
    logout();
    setToken("");
    localStorage.clear();
  }
    return(
      <nav className={`navbar-container`}>
        <div className="text-nav">
        <img src={imageSrcc} alt="Book Library" className="home-image-nav" />
        <p>. Bookify</p>
        </div>
        <div className="mainNav">
          <NavLink to="/" className="nav-linkk">
            Home
            </NavLink>
            <NavLink to="/Inventory" className="nav-linkk">
            Inventory
            </NavLink>

            <NavLink to="/Return" className="nav-linkk">Return Books</NavLink>

            <NavLink to="/profile/:id" className="profile">Admin</NavLink>
          </div>

                    <NavLink to="/logout" className="log-out-btn-container">
          <button className="log-out-btn" onClick={()=>logOutHandler()}>Log Out</button>
          </NavLink>
    </nav>
    );
};

export default NavBar2

