import React from "react";
import { useParams } from "react-router-dom";
import Rating from "./Rating";
import Loading from "./Loading";
import "../css/style.css";
import Helpers from "../Helpers/Helpers";
import API from "../Helpers/API";

export default function BookPage(props) {

    const { id } = useParams();
    const [book, setBook] = React.useState({});

    const url = `${API.API_URL_GET_BOOK}${id}`;

    React.useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(res => setBook(res.data));
    }, []);

    return (

        Object.keys(book).length === 0 ? <Loading /> :

            <div>
                <div className="card book-container mb-3">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <i className="fa-solid fa-bookmark"></i>
                            <img src={`${API.API_URL_GET_BOOK_IMAGE}${book.imagePath}`} className="img-fluid book-img" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h4>{book.title}</h4>
                                <ul className="list-group">
                                    <li key="authors" className="list-group-item">Συγγραφείς: {book.authors?.map((author, i, arr) => <span><a href={"/author/" + author.id}>{author.name + " " + author.surname}</a>{Helpers.addCommaIfNeeded(i, arr)}</span>)}</li>
                                    <li key="categories" className="list-group-item">Κατηγορίες: {book.categories?.map((category, i, arr) => <span><a href="#">{category.description}</a>{Helpers.addCommaIfNeeded(i, arr)}</span>)}</li>
                                    <li key="isbn" className="list-group-item">ISBN: {book.isbn}</li>
                                    <li key="publishers" className="list-group-item">Εκδόσεις: {book.publishers?.map((publisher, i, arr) => <span><a href="#">{publisher.description}</a>{Helpers.addCommaIfNeeded(i, arr)}</span>)} </li>
                                    <li key="publishDate" className="list-group-item">Ημερομηνία έκδοσης: {Helpers.formatDate(book.publishDate)}</li>
                                    <li key="pages" className="list-group-item">Σελίδες: {book.pageCount}</li>
                                    <li key="description" className="list-group-item" style={{ textAlign: "justify", height: "240px" }}>{book.description}</li>
                                </ul>
                                <div className="book-details-actions">
                                    <div className="book-rating">
                                        <i className="fa-solid fa-star"></i>
                                        <span style={{ color: "var(--main-detail-color)", fontWeight: "bold" }}>{book.rating}/5  ({book.totalRatings})</span>
                                    </div>
                                    <button type="button" onClick={() => props.addItemToBasket(book.id)} className="btn btn-primary btn-custom card-btn"><i className="fa-solid fa-basket-shopping"></i>Προσθήκη στο καλάθι</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <div className="comments-container" >
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", paddingTop: "1rem" }}>
                        <h4><i className="fa-solid fa-comment"></i>Σχόλια χρηστών</h4>
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#comments" aria-expanded="true" aria-controls="comments"></button>
                    </div>
                    <div id="comments" className="collapse show">

                        {
                            book.ratings.length > 0 ?
                                <ul className="list-group">
                                    {book.ratings.map(rating => <li className="list-group-item"><Rating key={rating.username} rating={rating} /></li>)}
                                </ul>
                                :
                                <h5 style={{ textAlign: "center", paddingTop: "2rem" }}>Δεν υπάρχουν σχόλια χρηστών.</h5>

                        }


                    </div>

                </div>
            </div >
    );


}