import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">

            <p>At Tasty World, we are passionate about bringing the rich and diverse flavors of India to your plate. We take pride in preserving the authenticity of Indian cuisine while delivering a memorable dining experience. Every dish on our menu is crafted with the finest ingredients, aromatic spices, and age-old recipes passed down through generations. From the vibrant curries of the North to the coastal delicacies of the South, our culinary offerings reflect the cultural diversity and heritage of India.</p>
            <div className="footer-social-icons">
                <a href="https://www.instagram.com/tastyworld_crewe/" target="_blank" rel="noopener noreferrer"></a>
                    <img src={assets.facebook_icon} alt="" />
                <a/>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>TASTY WORLD</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>07747070843</li>
                <li>tastyworld252@gmail.com</li>
                <li>252 Edleston Road CW2 7EH</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">TASTY WORLD</p>
    </div>
  )
}

export default Footer
