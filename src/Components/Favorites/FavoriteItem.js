import React from "react";
import "../../css/style.css";
import API from "../../Helpers/API";
import Helpers from "../../Helpers/Helpers";
import { BasketContext, BASKET_ACTIONS } from "../../App";

export default function FavoriteItem(props) {

    const basket = React.useContext(BasketContext);

    React.useEffect(() => Helpers.setupTooltips(), []);

    return (
        <tr className="cart-item" key={props.favorite.book.id}>
            <td><img className="cart-img" src={`${API.API_URL_GET_BOOK_IMAGE}${props.favorite.book.imagePath}`} /></td>
            <td className="align-middle title-in-table"><a href={`/Book/${props.favorite.book.id}`}><h6>{props.favorite.book.title}</h6></a></td>
            <td className="align-middle">{Helpers.formatDate(props.favorite.dateAdded)}</td>
            <td className="align-middle"><i className={`fa-solid ${props.favorite.bookRead ? "fa-check" : "fa-xmark"}`}></i></td>
            <td className="align-middle"><button type="button" disabled={props.favorite.book.stock == 0} onClick={() => basket.manageBasket({type: BASKET_ACTIONS.ADD_ITEM, payload: { itemId: props.favorite.book.id }})} data-bs-toggle="tooltip" data-bs-placement="top" title="Προσθήκη στο καλάθι" className="btn btn-primary btn-custom btn-circle"><i className="fa-solid fa-basket-shopping"></i></button></td>
            <td className="align-middle"><button type="button" onClick={() => props.deleteFavorite(props.favorite.book.id)} className="btn btn-primary btn-custom btn-circle" data-bs-toggle="tooltip" data-bs-placement="top" title="Διαγραφή"><i className="fa-solid fa-trash-can"></i></button></td>
        </tr>
    );
}