import { useEffect, useState } from "react";
import "./Footer1.css";

export function Footer() {
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    function handleScroll() {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`footer ${showFooter ? 'show' : ''}`}>
      <div className="footer-container">
        <div className="footer-item">
          <img src="https://i.pinimg.com/736x/22/16/8c/22168cf50fa9316f484cd407fbfa07d2.jpg" alt="Phone Icon"/>
          <p>Phone: 123-456-7890</p>
        </div>
        <div className="footer-item">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOtyKxThPKryD8et2zlUfGO9kjctiK6sm-JJuYlsAVzw&s" alt="Location Icon"/>
          <p>123 Street, City, Country</p>
        </div>
        <div className="footer-item">
          <img src="https://i.pinimg.com/originals/f1/81/30/f18130fa9bbe5686b39e0f36319470e7.png" alt="Email Icon"/>
          <p>Email: example@example.com</p>
        </div>
      </div>
      <div className="footer-rights">
        <p>
          @{new Date().getFullYear() } Library Automated System. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
