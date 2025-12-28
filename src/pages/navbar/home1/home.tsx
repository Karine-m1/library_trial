import React from 'react';
import "./home.css";

import { default as imageSrc, default as imageSrca } from "./xy.png";

import { useNavigate } from "react-router-dom";
import imageAbt from "./new.png";

import { useAuth } from '../MyBooks/context/authContext';
import imageserOne from "./serOne.png";
import imageserThree from "./serThree.png";
import imageserTwo from "./serTwo.png";

const Home: React.FC = () => {

  const {userId} = useAuth();
  console.log("userId:",userId);
  const navigate = useNavigate();

  const handleDiscoverMoreClick = () => {
    if (userId === "1") {
      navigate('/Inventory/');
    } else {
      navigate('/BookList/');
    }
  };
  
  return (
    <div>
    
    <div className="home-container-base">
    <div className="home-container">
      <img src={imageSrc} alt="Book Library" className="home-image" />
      <div className="home-intro">
        <h1>Welcome to Our Book Library!</h1>
        <h2>"There is no friend as loyal as a book"</h2>
        <p>
          Explore our vast collection of books 
        </p>
        <p>and discover your next favorite
          read!</p>
        {/* <button className="home-button" onClick={() => navigate(`/BookList/`)}> Discover more</button> */}
        <button className="home-button" onClick={handleDiscoverMoreClick}> Discover more</button>
      </div>
      <img src={imageSrca} alt="Book Library" className="home-image" />
    </div>

      <div className="home-services">
        <h1>Our services</h1>
        <div className='head-ser'>
        <div className="ser-text">
             <p>Whether your'e borrowing books, accessing digital resources, or seeking assisstance from our knowledgwable staff,
          </p><p> We're here to support your journey.
          </p>
          </div>
        </div>
        <div className='card'>
          <div className='one'>
            <span></span>
          <img src={imageserOne} alt="Bookk Library" className="serOne-image" />
          <h2>Library Management operations  </h2>organizing and tracking large collections of books</div>
          <div className='two'>
          <img src={imageserTwo} alt="Bookk Library" className="serTwo-image" />
          <h2 > Borrow with ease </h2>
          <p>Explore our vast collection of books available for borrowing</p></div>
          <div className='three'>
          <img src={imageserThree} alt="Bookk Library" className="serThree-image" />
          <h2 >Access anywhere, anytime</h2>
          <p>Enjoy 24/7 access to our collection of books</p></div>
      </div>
      </div>

      <div className="home-about">
      <img src={imageAbt} alt="Bookk Library" className="about-image" />
      <div className="about-text">
      <h1>Why US?</h1>
      <p>Our library signifies a transformative shift towards efficiency and convenience. </p>
      <p> You can browse the books available from your home and
        login to reserve your book remotely!
      </p>
      
      <button className="home-button" onClick={() => navigate(`/login/`)}>Log In</button>
      </div>
      </div>
    </div>
    </div>
  );
};

export default Home;