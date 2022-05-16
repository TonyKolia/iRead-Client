import React from "react";
import { useParams } from "react-router-dom";
import "../css/style.css";
import API from "../Helpers/API";
import Helpers from "../Helpers/Helpers";
import Orders from "./OrderItem";

export default function UserOrders(props) {

    const { id } = useParams();
    const [orders, setOrders] = React.useState([]);

    let token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidG9ueWtvbGlhNSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMzMiLCJleHAiOjE2NTI3MTA1MjR9.np0VKDb6t9pv2q4nWWGKwPQ5lbopIWngl6Wu4B4NzSjQDpo2mQVNV1nalVhrxfZX7TA5Eizu9H2wA7p_s9uUNw";

    React.useEffect(() => {
        Helpers.performGet(API.API_URL_GET_USER_ORDERS + id, token).then(response => setOrders(response.data));
    }, []);

    return (
        <div className="orders">
            <h4 style={{paddingBottom: "2rem"}}><i className="fa-solid fa-book"></i>Οι κρατήσεις μου</h4>
            <div class="accordion" id="accordionExample" style={{minWidth: "50%"}}>
                {orders.map(order => <Orders key={order.id} order={order} />)}
            </div>
        </div>

        
    );

}