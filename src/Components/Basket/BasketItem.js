import React from "react";
import "../../css/style.css";
import API from "../../Helpers/API";

//props here is a book
export default function BasketItem(props) {

    return (
        <tr className="cart-item">
            <td><img className="cart-img" src={`${API.API_URL_GET_BOOK_IMAGE}${props.imagePath}`} /></td>
            <td className="align-middle"><a href={`Book/${props.id}`}><h6>{props.title}</h6></a></td>
            <td className="align-middle">23/04/2022</td>
            <td className="align-middle"><button type="button" onClick={() => props.removeItemFromBasket(props.id)} className="btn btn-primary btn-custom"><i className="fa-solid fa-trash-can"></i></button></td>
        </tr>
    );
}