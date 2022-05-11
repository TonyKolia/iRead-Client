import React from "react";
import "../css/style.css";

export default function Navbar(props) {

    return (
        <nav className="navbar navbar-expand-lg navbar-fixed-top">
            <a className="navbar-brand" href="/">iRead</a>
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/books">Τα βιβλία</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/library">Η βιβλιοθήκη</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/stuff">Το προσωπικό</a>
                    </li>
                </ul>
            </div>
            <div style={{ width: "70%", display: "flex", justifyContent: "flex-end" }}>
                <ul className="navbar-nav">
                    <li>
                        <a className="nav-link" data-bs-toggle="modal" data-bs-target="#loginModal"><i className="fa-solid fa-right-to-bracket"></i>Σύνδεση</a>
                    </li>
                    <li>
                        <div className="cart">
                            <a className="nav-link" href="/basket"><i className="fa-solid fa-basket-shopping"></i>Καλάθι</a>
                            <span className="badge">{props.numberOfItems}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )

}