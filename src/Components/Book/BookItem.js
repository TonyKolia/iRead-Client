import React from "react";
import "../../css/style.css";
import API from "../../Helpers/API";
import { BASKET_ACTIONS } from "../../App";
import { BasketContext } from "../../App";
import Helpers from "../../Helpers/Helpers";

export default function BookItem(props) {

    const basketContext = React.useContext(BasketContext);

    React.useEffect(() => Helpers.setupTooltips(), []);
    return (
        <div className="col">
            <div className="card card-custom">
                {props.book.stock == 0 && <span className="badge rounded-pill not-available-badge">Μη διαθέσιμο</span>}
                <i onClick={props.isFavorite ? null : () => props.addFavorite(props.book.id)} data-bs-toggle="tooltip" data-bs-placement="left" title={props.isFavorite ? null : "Προσθήκη σελιδοδείκτη"} className={`fa-solid fa-bookmark ${props.isFavorite && "favorite"}`}></i>
                <a href={`/book/${props.book.id}`}>
                    <img title={props.book.title} data-bs-toggle="tooltip" data-bs-placement="top" className="card-img-top card-img" src={`${API.API_URL_GET_BOOK_IMAGE}${props.book.imagePath}`} alt="book img" />
                </a>
                <div className="card-body d-flex flex-column">
                    <h6 className="card-title book-title">{props.book.title}</h6>
                    <button type="button" disabled={props.book.stock == 0} onClick={() => basketContext.manageBasket({ type: BASKET_ACTIONS.ADD_ITEM, payload: { itemId: props.book.id } })} className="btn btn-primary btn-custom ripple card-btn mt-auto"><i className="fa-solid fa-basket-shopping"></i>Στο καλάθι</button>
                </div>
            </div>
        </div>
    );
}