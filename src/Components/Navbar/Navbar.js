import React from "react";
import "../../css/style.css";
import DropdownMenu from "./DropdownMenu";
import { BasketContext, UserContext } from "../../App";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const basket = React.useContext(BasketContext);
    const user = React.useContext(UserContext);

    let navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-fixed-top">
            <img id="logo" onClick={() => navigate("/")} className="logo"  src={require("../../Images/logo.png")} />
            <div id="navItems" style={{ width: "90%", display: "flex", justifyContent: "flex-end" }}>
                <ul className="navbar-nav">
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
                    <li key="login">
                        {user.user.userId !== "" ? <DropdownMenu /> :
                            <a id="loginLink" className="nav-link nav-item fromLeft" data-bs-toggle="modal" data-bs-target="#loginModal"><i className="fa-solid fa-right-to-bracket"></i>Σύνδεση</a>
                        }
                    </li>
                    <li key="basket">
                        <NavLink to="/basket" className={({ isActive }) => { return isActive ? "nav-link nav-item fromLeft selected" : "nav-link nav-item fromLeft"; }} >
                            <div className="cart">
                                <i className="fa-solid fa-basket-shopping"></i>Καλάθι
                                <span className="badge">{basket.basket.length}</span>
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )

}