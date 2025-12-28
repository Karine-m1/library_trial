import { useEffect, useState } from "react";
import "./footer.css";
export function Footer() {

    const [showFooter, setShowFooter] = useState(true);

    useEffect(() => {
        function handleScroll() {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
            if (scrollHeight <= clientHeight || scrollTop + clientHeight >= scrollHeight) {
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
      {/* <div className="footer-container">
    <div className="footer-item">
      <img src="https://static-00.iconduck.com/assets.00/phone-icon-2048x2048-nottqc8j.png" alt="Phone Icon"/>
      <p>Phone: 123-456-7890</p>
    </div>
    <div className="footer-item">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOYt4yKPBnydTsPmE-BEX3Ln0WV_q55mGz9A&usqp=CAU" alt="Location Icon"/>
      <p>123 Street, City, Country</p>
    </div>
    <div className="footer-item">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi2sebiGbN096zHuLZWh78TqI5sXskaYs4Ow&usqp=CAU" alt="Email Icon"/>
      <p>Email: example@example.com</p>
    </div>
  </div> */}
        <div className="footer-rights">
        <p>
            @{new Date().getFullYear() } Library Automated System. All Rights Reserved.
        </p>
        </div>
        <div className="footer-below-links">
            {/* <a href="/terms"><div><p>terms and conditions</p></div></a>
            <a href="/privacy"><div><p>privacy</p></div></a>
            <a href="/security"><div><p>security</p></div></a>
            <a href="/cookies"><div><p>cookies</p></div></a> */}
        </div>
    </div>
    );
  }
  
  
  export default Footer