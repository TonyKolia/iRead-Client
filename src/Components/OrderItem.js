import React from "react";
import "../css/style.css";
import API from "../Helpers/API";
import Helpers from "../Helpers/Helpers";

export default function Orders(props) {


    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#order${props.order.id}`} aria-expanded="false" aria-controls={`order${props.order.id}`}>
                    <div><span><h6>{`Αριθμός κράτησης: #${props.order.id}`}</h6></span><span><h6>{`Ημερομηνία κράτησης: ${Helpers.formatDate(props.order.orderDate)}`}</h6></span></div>
                </button>
            </h2>
            <div id={`order${props.order.id}`} className="accordion-collapse collapse" aria-labelledby={`order${props.order.id}`} data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <table className="table">
                        <thead>
                        </thead>
                        <tbody>
                            {props.order.books.map(book => {
                                return (
                                    <tr className="cart-item">
                                        <td><img className="cart-img" src={`${API.API_URL_GET_BOOK_IMAGE}${book.imagePath}`} /></td>
                                        <td className="align-middle"><a href={`/Book/${book.id}`}><h6>{book.title}</h6></a></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}