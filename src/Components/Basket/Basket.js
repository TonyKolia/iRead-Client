import React from "react";
import "../../css/style.css";
import API from "../../Helpers/API";
import BasketItem from "./BasketItem";

export default function Basket(props) {

    const [basketBooks, setbasketBooks] = React.useState([]);

    function constructUrl(basketItems) {
        var bookIds = "";
        basketItems.forEach(itemId => {
            bookIds += itemId + "-";
        });
        bookIds = bookIds.substring(0, bookIds.length - 1);

        return API.API_URL_GET_MULTIPLE_BOOKS + bookIds;
    }

    React.useEffect(() => {
        fetch(constructUrl(props.basketItems))
            .then(res => res.json())
            .then(res => setbasketBooks(res.data));
    }, [props.basketItems, basketBooks]);

    return (
        <div className="cart-container">
            <h4><i className="fa-solid fa-basket-shopping"></i>Το καλάθι μου</h4>
            {
                basketBooks === undefined || basketBooks.length == 0 ? <h5>Δεν υπάρχουν βιβλία στο καλάθι.</h5> :
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Τίτλος</th>
                                <th>Ημερομηνία επιστροφής</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {basketBooks?.map(book => <BasketItem key={book.id} id={book.id} title={book.title} imagePath={book.imagePath} removeItemFromBasket={props.removeItemFromBasket} />)}
                        </tbody>
                    </table>
            }


            <div>
                <div className="cart-btn-container">
                    <button type="button" className="btn btn-primary btn-custom"><i className="fa-solid fa-arrow-left"></i>Επιστροφή</button>
                    {(basketBooks !== undefined && basketBooks.length > 0) && <button type="button" onClick={() => props.clearBasket()} className="btn btn-primary btn-custom"><i className="fa-solid fa-arrow-rotate-right"></i>Καθαρισμός</button>}
                    {((basketBooks !== undefined && basketBooks.length > 0) && props.user.userId !== "") && <button type="button" className="btn btn-primary btn-custom"><i className="fa-solid fa-check"></i>Κράτηση</button>}
                </div>
            </div>
        </div>
    );
}