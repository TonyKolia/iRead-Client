import React from "react";
import "../../css/style.css";
import API from "../../Helpers/API";
import Helpers from "../../Helpers/Helpers";

export default function Orders(props) {


    return (
        <>
            <tr className="order-tr" style={{verticalAlign: "middle"}}>
                <td>{`#${props.order.id}`}</td>
                <td>{Helpers.formatDate(props.order.orderDate)}</td>
                <td>{props.order.status}</td>
                <td style={{width: "1%"}}>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#order${props.order.id}`} aria-expanded="false" aria-controls={`order${props.order.id}`}>
                    </button>
                </td>
            </tr>
            <tr>
                <td className="hidden-td" colSpan={4}>
                    <div id={`order${props.order.id}`} className="accordion-collapse collapse" aria-labelledby={`order${props.order.id}`}>
                        <div className="accordion-body">
                            <table className="table">
                                <thead>
                                </thead>
                                <tbody>
                                    {props.order.books.map(book => {
                                        return (
                                            <tr key={book.id} className="order-item">
                                                <td><img className="cart-img" src={`${API.API_URL_GET_BOOK_IMAGE}${book.imagePath}`} /></td>
                                                <td style={{verticalAlign: "middle", width: "100%"}}><a href={`/Book/${book.id}`}><h6>{book.title}</h6></a></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </td>

            </tr>
        </>


    );
}