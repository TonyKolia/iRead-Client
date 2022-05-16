import React from "react";
import "../../css/style.css";
import API from "../../Helpers/API";
import Helpers from "../../Helpers/Helpers";
import { BasketContext, BASKET_ACTIONS } from "../../App";

export default function FavoriteItem(props) {

    const basket = React.useContext(BasketContext);

    return (
        <tr className="cart-item">
            <td><img className="cart-img" src={`${API.API_URL_GET_BOOK_IMAGE}${props.favorite.book.imagePath}`} /></td>
            <td className="align-middle"><a href={`/Book/${props.favorite.book.id}`}><h6>{props.favorite.book.title}</h6></a></td>
            <td className="align-middle">{Helpers.formatDate(props.favorite.dateAdded)}</td>
            <td className="align-middle"><i className={`fa-solid ${props.favorite.bookRead ? "fa-check" : "fa-xmark"}`}></i></td>
            <td className="align-middle"><button type="button" onClick={() => basket.dispatchBasket({type: BASKET_ACTIONS.ADD_ITEM, payload: { itemId: props.favorite.book.id }})} className="btn btn-primary btn-custom"><i className="fa-solid fa-basket-shopping"></i></button></td>
            <td className="align-middle"><button type="button" className="btn btn-primary btn-custom"><i className="fa-solid fa-trash-can"></i></button></td>
        </tr>
    );
}