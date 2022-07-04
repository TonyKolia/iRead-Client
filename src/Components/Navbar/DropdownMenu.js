import React from "react";
import "../../css/style.css";
import { useNavigate } from "react-router-dom";
import { UserContext, USER_ACTIONS } from "../../App";
import { NavLink } from "react-router-dom";
import { Dropdown } from "bootstrap";

export default function DropdownMenu() {

    let navigate = useNavigate();
    const user = React.useContext(UserContext);
    const [dropdown, setDropdown] = React.useState(null);

    React.useEffect(() => {
        let element = document.getElementById("navbarDarkDropdownMenuLink");
        setDropdown(new Dropdown(element));
    }, []);

    return (
        <div className="collapse show navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
                <li className="dropdown">
                    <a onClick={() => dropdown.toggle()} className="nav-item fromLeft nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-user"></i>{user.user.username}</a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
                        <li key="bookmarks">
                            <NavLink to="/bookmarks" className={({ isActive }) => { return isActive ? "dropdown-item selected" : "dropdown-item"; }}>
                                <i className="fa-solid fa-bookmark"></i>Οι σελιδοδείκτες μου
                            </NavLink>
                        </li>
                        <li key="orders">
                            <NavLink to="/orders" className={({ isActive }) => { return isActive ? "dropdown-item selected" : "dropdown-item"; }}>
                                <i className="fa-solid fa-book"></i>Οι κρατήσεις μου
                            </NavLink>
                        </li>
                        <li key="logout" onClick={() => { user.dispatchUser({ type: USER_ACTIONS.LOGOUT }); navigate("/"); }} className="dropdown-item"><i className="fa-solid fa-right-from-bracket"></i>Αποσύνδεση</li>
                    </ul>
                </li>
            </ul>
        </div>
    );

}