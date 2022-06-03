import React from "react";
import "../../css/style.css";
import Helpers from "../../Helpers/Helpers";
import API from "../../Helpers/API";
import { BASKET_ACTIONS } from "../../App";
import { BasketContext } from "../../App";
import { useNavigate } from "react-router-dom";

export default function BookItem(props) {

    let navigate = useNavigate();
    const basketContext = React.useContext(BasketContext);

    return (
        <div className="col">
            <div className="card card-custom">
                <i onClick={props.isFavorite ? null : () => props.addFavorite(props.book.id)} className={`fa-solid fa-bookmark ${props.isFavorite && "favorite"}`}></i>
                <img title={props.book.title} onClick={() => navigate(`/book/${props.book.id}`)} className="card-img-top card-img" src={`${API.API_URL_GET_BOOK_IMAGE}${props.book.imagePath}`} alt="book img" />
                <div className="card-body d-flex flex-column">
                    <h6 className="card-title book-title">{props.book.title}</h6>
                    <button type="button" disabled={props.book.stock == 0} onClick={() => basketContext.manageBasket({ type: BASKET_ACTIONS.ADD_ITEM, payload: { itemId: props.book.id } })} className="btn btn-primary btn-custom ripple card-btn mt-auto"><i className="fa-solid fa-basket-shopping"></i>Στο καλάθι</button>
                </div>
            </div>
        </div>
    );
}