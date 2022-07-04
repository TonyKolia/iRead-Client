import React from "react";
import "../../css/style.css";
import Helpers from "../../Helpers/Helpers";
import API from "../../Helpers/API";
import { UserContext, USER_ACTIONS } from "../../App";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Tooltip } from "bootstrap";

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
                    if (response.success) {
                        return setNotViewedNotifications(response.data);
                    }
                    else {
                        if (response.statusCode == 404)
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
                if (response.success) {
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

    const getTitle = () => {

        if (notViewedNotifications.length > 0)
            return `Έχετε νέες ειδοποιήσεις.`;
        else
            return "Δεν υπάρχουν νέες ειδοποίησεις."

    }

    const updateTitle = () => {

        let element = document.getElementById("notification-icon");
        element.setAttribute("data-bs-original-title", getTitle());

    }

    React.useEffect(() => {
        updateTitle();  
    }, [notViewedNotifications])

    return (

        <NavLink to="/notifications" className={({ isActive }) => { return isActive ? "nav-link nav-item fromLeft selected" : "nav-link nav-item fromLeft"; }}>
            <i id="notifications-bell" className="fa-solid fa-bell">{notViewedNotifications.length > 0 && <span id="new-notifications-indicator" className="notification-indicator position-absolute translate-middle p-2 rounded-circle"></span>}</i>
        </NavLink>

    );

}