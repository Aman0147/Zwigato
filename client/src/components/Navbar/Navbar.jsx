import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import "./Navbar.css";

const Navbar = ({ setLogin }) => {
    const nav = useNavigate();
    const [menu, setMenu] = useState("home");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { token, setToken } = useContext(StoreContext);

    const toggleMenu = () => setIsMenuOpen(prevState => !prevState);
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const handleMenuClick = (menuName) => {
        setMenu(menuName);
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem("token");
        setLogin(false);
    };

    const handleNav = () => {
        nav('/myorders');
    }

    return (
        <div className="navbar">
            <Link to="/">
                <img src={assets.logo} className="logo" alt="Logo" />
            </Link>
            <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
                <li
                    onClick={() => handleMenuClick("home")}
                    className={menu === "home" ? "active" : ""}
                >
                    Home
                </li>
                <li
                    onClick={() => handleMenuClick("menu")}
                    className={menu === "menu" ? "active" : ""}
                >
                    Menu
                </li>
                <li
                    onClick={() => handleMenuClick("mobile-app")}
                    className={menu === "mobile-app" ? "active" : ""}
                >
                    Mobile App
                </li>
                <li
                    onClick={() => handleMenuClick("contact-us")}
                    className={menu === "contact-us" ? "active" : ""}
                >
                    Contact Us
                </li>
            </ul>
            <div className="navbar-right">
                <div className="navbar-search-icon">
                    <Link to="/cart">
                        <img src={assets.basket_icon} alt="Basket" />
                    </Link>
                </div>
                {token ? (
                    <div className="navbar-profile">
                        <img
                            src={assets.profile_icon}
                            alt="Profile"
                            onClick={toggleDropdown}
                        />
                        {showDropdown && (
                            <div className="profile-dropdown">
                                <button className="dropdown-btn" onClick={handleNav}>
                                    <img src={assets.bag_icon} alt="Orders" />
                                    Orders
                                </button>
                                <button className="dropdown-btn" onClick={handleLogout}>
                                    <img src={assets.logout_icon} alt="Logout" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button className="sign-in-btn" onClick={() => setLogin(true)}>
                        Sign-In
                    </button>
                )}
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                {isMenuOpen ? (
                    <FontAwesomeIcon icon={faTimes} className="icon cross-icon" />
                ) : (
                    <FontAwesomeIcon icon={faBars} className="icon" />
                )}
            </div>
        </div>
    );
};

export default Navbar;
