import React from "react";
import { useParams } from "react-router-dom";
import "../../css/style.css";
import API from "../../Helpers/API";
import Helpers from "../../Helpers/Helpers";
import Orders from "./OrderItem";
import { UserContext } from "../../App";

export default function UserOrders() {

    const [orders, setOrders] = React.useState([]);
    const user = React.useContext(UserContext);

    React.useEffect(() => {
        if(user.userId !== "")
            Helpers.performGet(`${API.API_URL_GET_USER_ORDERS}${user.userId}`, user.token).then(response => setOrders(response.data));
    }, [user]);

    return (
        <div className="orders">
            <h4 style={{paddingBottom: "2rem"}}><i className="fa-solid fa-book"></i>Οι κρατήσεις μου</h4>
            <div className="accordion" id="accordionExample" style={{minWidth: "50%"}}>
                {orders.map(order => <Orders key={order.id} order={order} />)}
            </div>
        </div>

        
    );

}