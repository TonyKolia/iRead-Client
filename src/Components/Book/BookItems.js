import React from "react";
import BookItem from "./BookItem";
import Loading from "../Loading";
import "../../css/style.css";
import API from "../../Helpers/API";
import Helpers from "../../Helpers/Helpers";
import { UserContext } from "../../App";

export default function BookItems(props) {

    const user = React.useContext(UserContext);

    const [books, setBooks] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [newFavorite, setNewFavorite] = React.useState(null);


    const constructURLBasedOnProps = (props) => {

        if (Object.keys(props).length === 0)
            return API.API_URL_GET_BOOK;

        if (props.category == null && props.filters.authors.length == 0 && props.filters.publishers.length == 0)
            return API.API_URL_GET_BOOK;

        if (props.category !== null && props.filters.authors.length == 0 && props.filters.publishers.length == 0)
            return API.API_URL_GET_BOOKS_BY_CATEGORY.replace(":categoryId", props.category);

        if (props.category == null && props.filters.authors.length > 0 && props.filters.publishers.length == 0) {
            let authors = "";
            props.filters.authors.forEach(author => authors += author + "-");
            authors = authors.substring(0, authors.length - 1);
            return API.API_URL_GET_BOOKS_BY_AUTHORS.replace(":authors", authors);
        }

        if (props.category == null && props.filters.authors.length == 0 && props.filters.publishers.length > 0) {
            let publishers = "";
            props.filters.publishers.forEach(publisher => publishers += publisher + "-");
            publishers = publishers.substring(0, publishers.length - 1);
            return API.API_URL_GET_BOOKS_BY_PUBLISHERS.replace(":publishers", publishers);
        }

        if(props.category == null && props.filters.authors.length > 0 && props.filters.publishers.length > 0){
            let publishers = "";
            props.filters.publishers.forEach(publisher => publishers += publisher + "-");
            publishers = publishers.substring(0, publishers.length - 1);
            let authors = "";
            props.filters.authors.forEach(author => authors += author + "-");
            authors = authors.substring(0, authors.length - 1);
            return API.API_URL_GET_BOOKS_BY_FILTERS.replace(":authors", authors).replace(":publishers", publishers);
        }

        return API.API_URL_GET_BOOK;
    }

    React.useEffect(() => {

        fetch(constructURLBasedOnProps(props))
            .then(res => res.json())
            .then(res => setBooks(res.data));
    }, [props]);

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
        books?.length === 0 ? <Loading /> :
            <div className="row row-cols-1 row-cols-md-5 card-custom-container">
                {books?.map(book => <BookItem key={book.id} book={book} isFavorite={favorites?.some(favorite => favorite == book.id)} addFavorite={addFavorite} />)}
            </div>
    );
}