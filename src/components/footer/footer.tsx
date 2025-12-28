import { useEffect, useState } from "react";
import "./footer.css"
export function Footer() {

    const [showFooter, setShowFooter] = useState(false);

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
        <div className="footer-rights">
        <p>
            @{new Date().getFullYear() } Library Automated System. All Rights Reserved.
        </p>
        </div>
        {/* <div className="footer-below-links">
            <a href="/terms"><div><p>terms and conditions</p></div></a>
            <a href="/privacy"><div><p>privacy</p></div></a>
            <a href="/security"><div><p>security</p></div></a>
            <a href="/cookies"><div><p>cookies</p></div></a>
        </div> */}
    </div>
    );
  }
  
  
  export default Footer