import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'
const Footer = () => {
    return (
        <div className='footer' id = 'footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img className = "logo-footer" src={assets.logo} alt="" />
                    <p>Zwigato is a food delivery platform designed to connect restaurants with customers, allowing users to browse menus, place orders, and have meals delivered to their doorstep. It offers a seamless interface for both customers and delivery personnel, ensuring efficient order management and real-time tracking.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li><a className='footer-a' href = "tel:9876543210" >CONTACT US</a></li>
                        <li>contact@zwigato.com</li>
                    </ul>
                </div>
            </div>

            <hr/>
            <div className="footer-copyright">Copyright 2024@ Zwigato.com-All Rights Reserved</div>
        </div>
    )
}

export default Footer
