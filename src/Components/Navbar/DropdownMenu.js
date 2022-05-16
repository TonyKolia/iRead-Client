import React from "react";
import "../../css/style.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

export default function DropdownMenu(props) {

    let navigate = useNavigate();
    const user = React.useContext(UserContext);

    return (
        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-user"></i>{user.username}</a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
                        <li key="bookmarks"><a className="dropdown-item" href="/bookmarks"><i className="fa-solid fa-bookmark"></i>Οι σελιδοδείκτες μου</a></li>
                        <li key="orders"><a className="dropdown-item" href="/orders"><i className="fa-solid fa-book"></i>Οι κρατήσεις μου</a></li>
                        <li key="logout" onClick={() => { props.logoutUser(); navigate("/"); }} className="dropdown-item"><i className="fa-solid fa-right-from-bracket"></i>Αποσύνδεση</li>
                    </ul>
                </li>
            </ul>
        </div>
    );

}