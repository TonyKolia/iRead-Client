import React from "react";
import "../../css/style.css";
import Helpers from "../../Helpers/Helpers";
import API from "../../Helpers/API";
import { BASKET_ACTIONS } from "../../App";
import { BasketContext } from "../../App";

export default function BookItem(props) {

    const basketContext = React.useContext(BasketContext);

    return (
        <div className="col">
            <div className="card card-custom">
                <i onClick={props.isFavorite ? null : () => props.addFavorite(props.book.id)} className={`fa-solid fa-bookmark ${props.isFavorite && "favorite"}`}></i>
                <img className="card-img-top card-img" src={`${API.API_URL_GET_BOOK_IMAGE}${props.book.imagePath}`} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title book-title"><a href={"/book/" + props.book.id}>{props.book.title}</a></h5>
                    {props.book.categories.map((category, i, arr) => <span key={category.id} className="book-title card-text"><a href="#">{category.description}</a>{Helpers.addCommaIfNeeded(i, arr)}</span>)}
                    <button type="button" disabled={props.book.stock == 0} onClick={() => basketContext.dispatchBasket({ type: BASKET_ACTIONS.ADD_ITEM, payload: { itemId: props.book.id } })} className="btn btn-primary btn-custom ripple card-btn"><i className="fa-solid fa-basket-shopping"></i>Προσθήκη στο καλάθι</button>
                </div>
            </div>
        </div>
    );
}