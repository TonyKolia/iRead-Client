import React from "react";
import "../../css/style.css";
import { useNavigate } from "react-router-dom";

export default function DropdownMenu(props) {

    let navigate = useNavigate();

    return (
        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-user"></i>{props.user.username}</a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
                        <li key="bookmarks"><a className="dropdown-item" href="/Bookmarks"><i className="fa-solid fa-bookmark"></i>Οι σελιδοδείκτες μου</a></li>
                        <li key="orders"><a className="dropdown-item" href="/orders/user/33"><i className="fa-solid fa-book"></i>Οι κρατήσεις μου</a></li>
                        <li key="logout" onClick={() => { props.logoutUser(); navigate("/"); }} className="dropdown-item"><i className="fa-solid fa-right-from-bracket"></i>Αποσύνδεση</li>
                    </ul>
                </li>
            </ul>
        </div>
    );

}