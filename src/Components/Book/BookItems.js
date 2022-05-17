import React from "react";
import BookItem from "./BookItem";
import Loading from "../Loading";
import "../../css/style.css";
import API from "../../Helpers/API";
import Helpers from "../../Helpers/Helpers";
import { UserContext } from "../../App";

export default function BookItems() {

    const user = React.useContext(UserContext);

    const [books, setBooks] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [newFavorite, setNewFavorite] = React.useState(null);

    React.useEffect(() => {
        fetch(API.API_URL_GET_BOOK)
            .then(res => res.json())
            .then(res => setBooks(res.data));
    }, []);

    React.useEffect(() => {
        if (user.user.userId !== "")
            Helpers.performGet(`${API.API_URL_GET_USER_FAVORITES}${user.user.userId}`, user.user.token).then(response => setFavorites(response.data?.map(x => x.book.id)));
    }, [user, newFavorite]);

    const addFavorite = (bookId) => {

        if (user.user.userId == "")
            return alert("login man");

        Helpers.performPost(API.API_URL_ADD_NEW_FAVORITE, { userId: user.user.userId, bookId: bookId }, user.user.token)
            .then(response => {
                if (response.success)
                    return setNewFavorite(bookId);
                else
                    return alert("lol");
            });
    }

    return (
        books.length === 0 ? <Loading /> :
            <div className="row row-cols-1 row-cols-md-5 card-custom-container">
                {books.map(book => <BookItem key={book.id} book={book} isFavorite={favorites?.some(favorite => favorite == book.id)} addFavorite={addFavorite} />)}
            </div>
    );
}