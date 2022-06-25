import React from "react";
import "../../css/style.css";
import API from "../../Helpers/API";
import { BasketContext } from "../../App";
import { BASKET_ACTIONS } from "../../App";
import Helpers from "../../Helpers/Helpers";

//props here is a book
export default function BasketItem(props) {

    const basket = React.useContext(BasketContext);

    const getReturnDate = () => {
        let date = new Date();
        date.setDate(date.getDate() + 10);
        return date;
    }

    return (
        <tr className="cart-item">
            <td><img className="cart-img" src={`${API.API_URL_GET_BOOK_IMAGE}${props.imagePath}`} /></td>
            <td className="align-middle title-in-table"><a href={`Book/${props.id}`}><h6>{props.title}</h6></a></td>
            <td className="align-middle">{Helpers.formatDate(getReturnDate())}</td>
            <td className="align-middle"><button type="button" onClick={() => props.removeItemFromBasket(props.id)} className="btn btn-primary btn-custom btn-circle" title="Διαγραφή"><i className="fa-solid fa-trash-can"></i></button></td>
        </tr>
    );
}