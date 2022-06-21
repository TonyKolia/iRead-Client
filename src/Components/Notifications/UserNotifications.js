import React from "react";
import "../../css/style.css";
import { UserContext } from "../../App";
import Helpers from "../../Helpers/Helpers";
import API from "../../Helpers/API";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

export default function UserNotifications() {

    const user = React.useContext(UserContext);
    const [userNotifications, setUserNotifications] = React.useState({ notViewed: [], viewed: [] });
    const [loading, setLoading] = React.useState(false);
    const [selectedTab, setSelectedTab] = React.useState(1);
    let navigate = useNavigate();

    React.useEffect(() => {
        if (user.user.userId === "")
            return;
        setLoading(true);
        let url = API.API_URL_GET_ORGANIZED_NOTIFICATIONS.replace(":userId", user.user.userId);
        Helpers.performGet(url, user.user.token)
            .then(response => {
                setLoading(false);
                if (response.success)
                    return setUserNotifications({ notViewed: response.data.notViewed, viewed: response.data.viewed });
                else {
                    if (response.statusCode == 404)
                        return setUserNotifications({ notViewed: [], viewed: [] });
                    else
                        return navigate("/error");
                }
            });
    }, [user]);


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


    const moveNotificationToViewed = (id) => {

        let notification = userNotifications.notViewed.find(x => x.id === id);
        setUserNotifications(oldValue => {

            return ({
                notViewed: oldValue.notViewed.filter(x => x.id !== id),
                viewed: [...oldValue.viewed, notification]
            });

        });

        if (userNotifications.notViewed.length === 1) {

            let newNotificationsIndicator = document.getElementById("new-notifications-indicator");
            newNotificationsIndicator.style.display = "none";

            let notificationBell = document.getElementById("notifications-bell");
            notificationBell.title = "Δεν υπάρχουν νέες ειδοποίησεις.";
        }

    }

    const markNotificationAsViewed = (notificationId) => {

        setLoading(true);
        var url = API.API_URL_PUT_MARK_NOTIFICATION_AS_VIEWED.replace(":id", notificationId);
        Helpers.performPut(url, null, user.user.token)
            .then(response => {
                setLoading(false);
                if (response.success) {
                    moveNotificationToViewed(notificationId);
                    return Helpers.successMessage("Ολοκληρώθηκε με επιτυχία!");
                }
                else {
                    if (response.statusCode == 500)
                        return navigate("/error");
                }
            });
    }

    const displayNotViewed = () => {

        return (
            userNotifications.notViewed.length > 0 ? userNotifications.notViewed.map(notification => <li key={notification.id} className="notification-item" onMouseEnter={() => changeIconOnHover(`notification-item${notification.id}`)} onMouseLeave={() => resetIconOnHover(`notification-item${notification.id}`)}>
                <span className="notification-date">{Helpers.formatDate(notification.dateCreated)}</span>
                <div className="notification-cotainer">
                    <i title="Επισήμανση ως αναγνωσμένο" onClick={() => markNotificationAsViewed(notification.id)} id={`notification-item${notification.id}`} style={{ paddingLeft: "10px" }} className="fa-solid fa-circle"></i>
                    <span className="notification-text-full">{notification.notificationText}</span>
                </div>
            </li>) : <li style={{ listStyleType: "none" }}><h6 style={{ textAlign: "center", paddingTop: "1rem" }}>{loading ? "" : "Δεν βρέθηκαν ειδοποιήσεις."}</h6></li>
        )
    }

    const displayViewed = () => {

        return (
            userNotifications.viewed.length > 0 ? userNotifications.viewed.map(notification => <li key={notification.id} className="notification-item">
                <span className="notification-date">{Helpers.formatDate(notification.dateCreated)}</span>
                <div className="notification-cotainer">
                    <span className="notification-text-full">{notification.notificationText}</span>
                </div>

            </li>) : <li style={{ listStyleType: "none" }}><h6 style={{ textAlign: "center", paddingTop: "1rem" }}>{loading ? "" : "Δεν βρέθηκαν ειδοποιήσεις."}</h6></li>
        );

    }

    return (
        <>
            {loading && <Loading />}
            <div className="notifications-container">
                <h4><i className="fa-solid fa-bell"></i>Οι ειδοποιήσεις μου</h4>
                <>
                    <div style={{ marginTop: "10px" }}>
                        <ul className="nav justify-content-center mini-menu">
                            <li onClick={() => setSelectedTab(1)} key="not-viewed" className={`mini-menu-item fromLeft ${selectedTab == 1 ? "selected" : ""}`}>Μη αναγνωσμένες</li>
                            <li onClick={() => setSelectedTab(2)} key="viewed" className={`mini-menu-item fromLeft ${selectedTab == 2 ? "selected" : ""}`}>Αναγνωσμένες</li>
                        </ul>
                    </div>
                    <ul className="list-group notifications-list">
                        {selectedTab == 1 && displayNotViewed()}
                        {selectedTab == 2 && displayViewed()}
                    </ul>
                </>
            </div>
        </>
    );

}