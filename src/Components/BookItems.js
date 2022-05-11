import React from "react";
import BookItem from "./BookItem";
import Loading from "./Loading";
import "../css/style.css";

export default function BookItems() {

    const [books, setBooks] = React.useState([]);

    React.useEffect(() =>{
        fetch("https://localhost:7190/api/Book")
        .then(res => res.json())
        .then(res => setBooks(res.data));
    }, []);

    return (
        books.length === 0 ? <Loading /> :
        <div className="row row-cols-1 row-cols-md-5 card-custom-container">
           { books.map(book => <BookItem key={book.id} book = {book} /> ) }
        </div>
    );
}