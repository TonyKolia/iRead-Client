import React from "react";
import "../../css/style.css";
import Helpers from "../../Helpers/Helpers";
import API from "../../Helpers/API";
import { UserContext, USER_ACTIONS } from "../../App";
import { useNavigate } from "react-router-dom";

export default function Notifications() {

    let navigate = useNavigate();
    const user = React.useContext(UserContext);
    const [notViewedNotifications, setNotViewedNotifications] = React.useState([]);
    const [updateNotifications, setUpdateNotifications] = React.useState(0);

    React.useEffect(() => {

        if (user.user.userId !== "") {
            let url = API.API_URL_GET_NOT_VIEWED_NOTIFICATIONS.replace(":userId", user.user.userId);
            Helpers.performGet(url, user.user.token)
                .then(response => {
                    if (response.success)
                        return setNotViewedNotifications(response.data);
                    else {
                        if(response.statusCode == 404)
                            return setNotViewedNotifications([]);
                        if (response.statusCode == 500)
                            return navigate("/error");
                    }
                });
        }

    }, [user, updateNotifications]);

    const markNotificationAsViewed = (notificationId) => {

        var url = API.API_URL_PUT_MARK_NOTIFICATION_AS_VIEWED.replace(":id", notificationId);
        Helpers.performPut(url, null, user.user.token)
            .then(response => {
                if (response.success){
                    setUpdateNotifications(oldValue => oldValue + 1);
                    return Helpers.successMessage("Ολοκληρώθηκε με επιτυχία!");
                }
                else {
                    if (response.statusCode == 500)
                        return navigate("/error");
                }
            });
    }

    const changeIconOnHover = (id) => {
        var element = document.getElementById(id);
        element.classList.remove("fa-circle");
        element.classList.add("fa-circle-check");
    }

    const resetIconOnHover = (id) => {
        var element = document.getElementById(id);
        element.classList.remove("fa-circle-check");
        element.classList.add("fa-circle");

    }

    return (

        <div className="collapse navbar-collapse" id="notifications">
            <ul className="navbar-nav">
                <li className="dropdown">
                    <a className="nav-item fromLeft nav-link" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-bell">{notViewedNotifications.length > 0 && <span className="notification-indicator position-absolute translate-middle p-2 rounded-circle"></span>}</i>
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
                        {
                            notViewedNotifications.length === 0 ? <li className="dropdown-item not-interactable">Δεν υπάρχουν νέες ειδοποιήσεις.</li> :
                                notViewedNotifications.map(notification => <li key={notification.id} className="dropdown-item" onMouseEnter={() => changeIconOnHover(`notification${notification.id}`)} onMouseLeave={() => resetIconOnHover(`notification${notification.id}`)}>
                                    <div className="notification-cotainer">
                                        <i  title="Επισήμανση ως αναγνωσμένο" id={`notification${notification.id}`} onClick={() => markNotificationAsViewed(notification.id)} class="fa-solid fa-circle notification-dropdown-action"></i>
                                        <span className="notification-text">{notification.notificationText}</span>
                                    </div>
                                </li>)
                        }
                    </ul>
                </li>
            </ul>
        </div>

    );

}