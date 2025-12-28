import { useState } from "react";
// import imageSrc from "./contactImage1.png"
// import imageSrc from "./conts-bg.png"

import imageSrc from "./cccc.png";


import "./contact.css";

export function Contact() {
    const[data, setData] = useState({name:"", email:"", phone:"", message:""});
    const handleChange = (event:any) => {
        const name = event.target.name;
        const value = event.target.value;
        setData({...data, [name]: value})
    }
    // const handleSubmit = (event:any) => {
    //     event.preventDefault()
    //     alert(data)
    // }
    return (
        <div className="text">
            <div className="wrapper">
                <h1>Feel free to reach out if you're interested in learning more about the services we provide
                at our library.</h1>
                </div>
            {/* <p>Feel free to reach out to us if you're interested in learning more about the services we provide
                at our library.</p>  */}

                <div className="con-container">
                <div className="con-intro">
                <div className="form-container">
                    <div className="boxx">
                <form className="cc-form" action="https://formsubmit.co/sayeghnatalie34@gmail.com" method="POST">
                <h1>CONTACT <span>HERE!</span></h1>
                <input type="text" name="name" id="" onChange={handleChange} value={data.name} placeholder="Enter name" required/>
                <input type="email" name="email" id="" onChange={handleChange} value={data.email} placeholder="Enter email" required/>
                {/* <input type="phone" name="phone" id="" onChange={handleChange} value={data.phone} placeholder="enter phone number" required/> */}
                <textarea name="message" id="" cols={30} rows={10} onChange={handleChange} value={data.message} placeholder="Type here..." required/>
                <input type="hidden" name="_captcha" value="false"></input>
                <button type="submit">Send</button>
                </form>
                </div>
                </div>
                </div>
                <div className="home-image-bg" >
                <img src={imageSrc} alt="Book Library" className="con-image" />
                </div>
                </div>


        <div className="contact-container">
            {/* <div><p>Feel free to reach out to us if you're interested in learning more about the services we provide
                at our library.</p></div> */}
            {/* <form method="post" onSubmit="sendEmail()"></form> */}
            {/* <img src="src/pages/navbar/contact/contactImage.jpg" alt="Side Image" className="side-image" /> */}
            <div className="form-container">
            {/* <form action="https://formsubmit.co/sayeghnatalie34@gmail.com" method="POST">
                <h1>CONTACT <span>HERE!</span></h1>
                <input type="text" name="name" id="" onChange={handleChange} value={data.name} placeholder="enter name" required/>
                <input type="email" name="email" id="" onChange={handleChange} value={data.email} placeholder="enter email" required/>
                <input type="phone" name="phone" id="" onChange={handleChange} value={data.phone} placeholder="enter phone number" required/>
                <textarea name="message" id="" cols={30} rows={10} onChange={handleChange} value={data.message} placeholder="type here..." required/>
                <input type="hidden" name="_captcha" value="false"></input>
                <button type="submit">send</button>
            </form> */}
            </div>
        </div>
        {/* <div className="imagee-container">
            <img src="src/pages/navbar/contact/contactImage1.png" alt="Side Image" className="c-image" />
            <img src="src/pages/navbar/contact/contactImg2.png" alt="Side Image" className="c-image2" />
            </div> */}
        </div>
    )
  }
  
  
  export default Contact