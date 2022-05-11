import React from "react";
import "../css/style.css";
import Helpers from "../Helpers/Helpers";
import API from "../Helpers/API";

export default function BookItem(props) {

    console.log(props);

    return (
        <div className="col">
            <div className="card card-custom">
                <i className="fa-solid fa-bookmark"></i>
                <img className="card-img-top card-img" src={`${API.API_URL_GET_BOOK_IMAGE}${props.book.imagePath}`} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title book-title"><a href={"/book/" + props.book.id}>{props.book.title}</a></h5>
                    {props.book.categories.map((category, i, arr) => <span className="book-title card-text"><a href ="#">{category.description}</a>{Helpers.addCommaIfNeeded(i, arr)}</span>)}
                    <button type="button" onClick={ () => props.addItemToBasket(props.book.id)} className="btn btn-primary btn-custom card-btn"><i className="fa-solid fa-basket-shopping"></i>Προσθήκη στο καλάθι</button>
                </div>
            </div>
        </div>
    );
}