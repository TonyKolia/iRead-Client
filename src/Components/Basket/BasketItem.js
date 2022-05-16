import React from "react";
import "../../css/style.css";
import API from "../../Helpers/API";
import { BasketContext } from "../../App";
import { BASKET_ACTIONS } from "../../App";

//props here is a book
export default function BasketItem(props) {

    const basket = React.useContext(BasketContext);

    return (
        <tr className="cart-item">
            <td><img className="cart-img" src={`${API.API_URL_GET_BOOK_IMAGE}${props.imagePath}`} /></td>
            <td className="align-middle"><a href={`Book/${props.id}`}><h6>{props.title}</h6></a></td>
            <td className="align-middle">23/04/2022</td>
            <td className="align-middle"><button type="button" onClick={() => basket.dispatchBasket({ type: BASKET_ACTIONS.DELETE_ITEM, payload:{ itemId: props.id }})} className="btn btn-primary btn-custom"><i className="fa-solid fa-trash-can"></i></button></td>
        </tr>
    );
}