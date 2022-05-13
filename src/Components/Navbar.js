import React from "react";
import "../css/style.css";
import DropdownMenu from "./Navbar/DropdownMenu";

export default function Navbar(props) {

    let alert = null;
    let cssClass = "";
    let alertText = "";
    if (Object.keys(props.basketAddition).length > 0) {
        cssClass = props.basketAddition.failed ? "alert-danger" : "alert-success";
        alertText = props.basketAddition.message;
        alert = <div className={`alert ${cssClass}`} role="alert">{alertText}</div>
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-fixed-top">
            {alert}
            <a className="navbar-brand" href="/">iRead</a>
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                <ul className="navbar-nav">
                    <li key="books" className="nav-item">
                        <a className="nav-link" href="/books">Τα βιβλία</a>
                    </li>
                    <li key="library" className="nav-item">
                        <a className="nav-link" href="/library">Η βιβλιοθήκη</a>
                    </li>
                    <li key="stuff" className="nav-item">
                        <a className="nav-link" href="/stuff">Το προσωπικό</a>
                    </li>
                </ul>
            </div>
            <div style={{ width: "70%", display: "flex", justifyContent: "flex-end" }}>
                <ul className="navbar-nav">
                    <li key="login">
                        {props.user.userId !== "" ? <DropdownMenu user = {props.user} logoutUser = {props.logoutUser} /> :
                            <a className="nav-link" data-bs-toggle="modal" data-bs-target="#loginModal"><i className="fa-solid fa-right-to-bracket"></i>Σύνδεση</a>
                        }
                    </li>
                    <li key="basket">
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