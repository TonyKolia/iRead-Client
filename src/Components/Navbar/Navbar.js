import React from "react";
import "../../css/style.css";
import DropdownMenu from "./DropdownMenu";
import { BasketContext, UserContext } from "../../App";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Notifications from "./Notifications";
import Helpers from "../../Helpers/Helpers";

export default function Navbar() {

    const user = React.useContext(UserContext);
    const [size, setSize] = React.useState(1920);
    let navigate = useNavigate();

    React.useEffect(() => {

        setCurrentSize(window.innerWidth)
        Helpers.setupTooltips();

    }, []);

    const clearTooltips = () => {

        let elements = document.getElementsByClassName('tooltip');
        if(elements.length > 0){
            for(let i=0; i<elements.length; i++)
                elements[i].remove();
        }

    }

    const setCurrentSize = (currentSize) => setSize(currentSize);

    const toggleMobile = () => {
        let navItems = document.getElementById("navItems");
        if (navItems.style.display == "flex")
            navItems.style.display = "none";
        else
            navItems.style.display = "flex";
    }

    let desktopNavbar = <nav className="navbar navbar-expand-lg navbar-fixed-top">
        <img id="logo" onClick={() => navigate("/")} className="logo" src={require("../../Images/logo.png")} />
        <div id="navItems" style={{ width: "97%", display: "flex", justifyContent: "flex-end" }}>
            <ul className="navbar-nav">
                <li>
                    <NavLink to="/" className={({ isActive }) => { return isActive ? "nav-link nav-item fromLeft selected" : "nav-link nav-item fromLeft"; }} >
                        Αρχική
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/books" className={({ isActive }) => { return isActive ? "nav-link nav-item fromLeft selected" : "nav-link nav-item fromLeft"; }} >
                        Τα βιβλία
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/library" className={({ isActive }) => { return isActive ? "nav-link nav-item fromLeft selected" : "nav-link nav-item fromLeft"; }} >
                        Η βιβλιοθήκη
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/staff" className={({ isActive }) => { return isActive ? "nav-link nav-item fromLeft selected" : "nav-link nav-item fromLeft"; }} >
                        Το προσωπικό
                    </NavLink>
                </li>
            </ul>
        </div>
        <div style={{ width: "70%", display: "flex", justifyContent: "flex-end" }}>
            <ul className="navbar-nav">
                <li key="notifications" onClick ={clearTooltips} id="notification-icon" data-bs-toggle="tooltip" data-bs-custom-class="navbar-tooltip" data-bs-placement="bottom" title="">
                    {user.user.userId !== "" && <Notifications />}
                </li>
                <li key="login">
                    {user.user.userId !== "" ? <DropdownMenu /> :
                        <a id="loginLink" className="nav-link nav-item fromLeft" data-bs-toggle="modal" data-bs-target="#loginModal"><i className="fa-solid fa-right-to-bracket"></i>Σύνδεση</a>
                    }
                </li>
                <li key="basket">
                    <NavLink to="/basket" className={({ isActive }) => { return isActive ? "nav-link nav-item fromLeft selected" : "nav-link nav-item fromLeft"; }} >
                        <div className="cart">
                            <i className="fa-solid fa-basket-shopping"></i>Καλάθι
                            <span className="badge" id="basket-counter"></span>
                        </div>
                    </NavLink>
                </li>
            </ul>
        </div>
    </nav>

    let test = <><nav id="mobile-navbar" className="navbar navbar-expand-lg navbar-fixed-top">
        <img id="logo" onClick={() => navigate("/")} className="logo" src={require("../../Images/logo.png")} />
        <button onClick={toggleMobile} className="btn btn-primary btn-custom btn-circle"><i class="fa-solid fa-bars"></i></button>
    </nav>
        <div id="navItems" style={{ display: "none", paddingTop: "1rem", justifyContent: "center" }}>
            <ul className="navbar-nav">
                <li>
                    <NavLink to="/" className={({ isActive }) => { return isActive ? "nav-link nav-item fromLeft selected" : "nav-link nav-item fromLeft"; }} >
                        Αρχική
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/books" className={({ isActive }) => { return isActive ? "nav-link nav-item fromLeft selected" : "nav-link nav-item fromLeft"; }} >
                        Τα βιβλία
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/library" className={({ isActive }) => { return isActive ? "nav-link nav-item fromLeft selected" : "nav-link nav-item fromLeft"; }} >
                        Η βιβλιοθήκη
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/staff" className={({ isActive }) => { return isActive ? "nav-link nav-item fromLeft selected" : "nav-link nav-item fromLeft"; }} >
                        Το προσωπικό
                    </NavLink>
                </li>
                <li key="notifications">
                    {user.user.userId !== "" && <Notifications />}
                </li>
                <li key="login">
                    {user.user.userId !== "" ? <DropdownMenu /> :
                        <a id="loginLink" className="nav-link nav-item fromLeft" data-bs-toggle="modal" data-bs-target="#loginModal"><i className="fa-solid fa-right-to-bracket"></i>Σύνδεση</a>
                    }
                </li>
                <li key="basket">
                    <NavLink to="/basket" className={({ isActive }) => { return isActive ? "nav-link nav-item fromLeft selected" : "nav-link nav-item fromLeft"; }} >
                        <div className="cart">
                            <i className="fa-solid fa-basket-shopping"></i>Καλάθι
                            <span className="badge" id="basket-counter"></span>
                        </div>
                    </NavLink>
                </li>
            </ul>
        </div>
    </>


    return (
        size < 1024 ? test : desktopNavbar
    );

}