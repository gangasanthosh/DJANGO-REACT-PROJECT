import React from 'react';
import './ContactUs.css'; // Assuming your CSS file is named ContactUs.css

// Import the image using a relative path or a bundler-specific method
import messageImage from '../assets/images/msgbg.jpg'; // Relative path example

const ContactUs = () => {
  return (
    <div className="contact-us">
      <div className="contact-us__image">
        <img src={messageImage} alt="Message background image" />
      </div>
      <div className="contact-us__form">
        <h2>Get in touch</h2>
        <form>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              required // Add required attribute for validation
            />
          </div> 
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              required // Add required attribute for validation
            />
          </div>
          <div className="form-group">
            <textarea placeholder="Message" className="form-control" required></textarea>
          </div>
          <button type="submit" className="btn">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

