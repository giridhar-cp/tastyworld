import React from "react";
import "./AppDownload.css";
import { assets } from '../../assets/assets'


function AppDownload() {
  const handleWhatsAppEnquiry = () => {
    const message = encodeURIComponent("Hello, I am interested in enquiring about the hall.");
    window.open(`https://wa.me/+447799040759?text=${message}`, "_blank");
  };

  const handleGmailEnquiry = () => {
    const subject = encodeURIComponent("Hall Enquiry");
    const body = encodeURIComponent("Hello, I am interested in enquiring about the hall.");
    window.location.href = `mailto:tastyworld252@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div id="app-download" className="auditorium-enquiry">
      <h1>Hall Enquiry</h1>
      <div className="gallery">
        <img src={assets.hall1} alt=" " />
        <img src={assets.hall2} alt=" " />
        <img src={assets.hall3} alt=" " />
        <img src={assets.hall4} alt=" " />
      </div>
      <div className="buttons">
        <button onClick={handleWhatsAppEnquiry}>Enquire through WhatsApp</button>
        <button onClick={handleGmailEnquiry}>Enquire through Gmail</button>
      </div>
    </div>
  );
}

export default AppDownload;