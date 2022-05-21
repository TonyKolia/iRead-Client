import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import "../../css/style.css";
import Helpers from "../../Helpers/Helpers";
import API from "../../Helpers/API";
import { BasketContext, BASKET_ACTIONS, UserContext } from "../../App";
import Ratings from "../Ratings/Ratings";


export default function BookPage() {

    const { id } = useParams();
    const [book, setBook] = React.useState({});
    const basket = React.useContext(BasketContext);
    const user = React.useContext(UserContext);
    const [favorite, setFavorite] = React.useState(false);

    const url = `${API.API_URL_GET_BOOK}${id}`;

    React.useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(res => setBook(res.data));
    }, []);

    React.useEffect(() => {

        if (user.user.userId !== "" && book.id !== undefined) {
            let url = API.API_URL_GET_FAVORITE_EXISTS.replace(":userId", user.user.userId).replace(":bookId", book.id);
            Helpers.performGet(url, user.user.token).then(response => {
                if (response.data) {
                    return setFavorite(true);
                }
                else {
                    return setFavorite(false);
                }
            });
        }
    }, [user, book, favorite])

    const addFavorite = (bookId) => {

        if (user.user.userId == "")
            return alert("login man");

        Helpers.performPost(API.API_URL_ADD_NEW_FAVORITE, { userId: user.user.userId, bookId: bookId }, user.user.token)
            .then(response => {
                if (response.success)
                {
                    Helpers.successMessage("Προστέθηκε στους σελιδοδείκτες!");
                    return setFavorite(true);
                }
                else
                    return alert("lol");
            });
    }

    return (

        Object.keys(book).length === 0 ? <Loading /> :

            <div>
                <div className="card book-container mb-3">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <i onClick={favorite ? null : () => addFavorite(book.id)} className={`fa-solid fa-bookmark ${favorite ? "favorite" : ""}`}></i>
                            <img src={`${API.API_URL_GET_BOOK_IMAGE}${book.imagePath}`} className="img-fluid book-img" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h4>{book.title}</h4>
                                <ul className="list-group">
                                    <li key="authors" className="list-group-item">Συγγραφείς: {book.authors?.map((author, i, arr) => <span key={author.id}><a href={"/author/" + author.id}>{author.name + " " + author.surname}</a>{Helpers.addCommaIfNeeded(i, arr)}</span>)}</li>
                                    <li key="categories" className="list-group-item">Κατηγορίες: {book.categories?.map((category, i, arr) => <span key={category.id}><a href="#">{category.description}</a>{Helpers.addCommaIfNeeded(i, arr)}</span>)}</li>
                                    <li key="isbn" className="list-group-item">ISBN: {book.isbn}</li>
                                    <li key="publishers" className="list-group-item">Εκδόσεις: {book.publishers?.map((publisher, i, arr) => <span key={publisher.id}><a href="#">{publisher.description}</a>{Helpers.addCommaIfNeeded(i, arr)}</span>)} </li>
                                    <li key="publishDate" className="list-group-item">Ημερομηνία έκδοσης: {Helpers.formatDate(book.publishDate)}</li>
                                    <li key="pages" className="list-group-item">Σελίδες: {book.pageCount}</li>
                                    <li key="description" className="list-group-item" style={{ textAlign: "justify", height: "240px" }}>{book.description}</li>
                                </ul>
                                <div className="book-details-actions">
                                    <div className="book-rating">
                                        <i className="fa-solid fa-star"></i>
                                        <span style={{ color: "var(--main-detail-color)", fontWeight: "bold" }}>{book.rating}/5  ({book.totalRatings})</span>
                                    </div>
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#rating-modal" className="btn btn-primary btn-custom card-btn"><i className="fa-solid fa-star"></i>Αξιολόγηση βιβλίου</button>
                                    <button type="button" disabled={book.stock == 0} onClick={() => basket.dispatchBasket({ type: BASKET_ACTIONS.ADD_ITEM, payload: { itemId: book.id } })} className="btn btn-primary btn-custom card-btn"><i className="fa-solid fa-basket-shopping"></i>Προσθήκη στο καλάθι</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Ratings bookId ={book.id} bookTitle = {book.title} />
            </div >
    );


}