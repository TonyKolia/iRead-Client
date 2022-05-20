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

        let category = props.category ?? "ALL";

        let authors = "";
        props.filters.authors.forEach(author => authors += author + "-");
        authors = authors === undefined || authors.length == 0 ? "ALL" : authors.substring(0, authors.length - 1);

        let publishers = "";
        props.filters.publishers.forEach(publisher => publishers += publisher + "-");
        publishers = publishers === undefined || publishers.length == 0 ? "ALL" : publishers.substring(0, publishers.length - 1);

        let minYear = props.years.minYear === undefined || props.years.minYear == 0 ? "ALL" : props.years.minYear;
        let maxYear = props.years.maxYear === undefined || props.years.maxYear == 9999 ? "ALL" : props.years.maxYear;
        //Category/:category/Authors/:authors/Publishers/:publishers/MinYear/:minYear/MaxYear/:maxYear

        return API.API_URL_GET_BOOKS_BY_FILTERS.replace(":category", category).replace(":authors", authors).replace(":publishers", publishers).replace(":minYear", minYear).replace(":maxYear", maxYear);
    }

    React.useEffect(() => {

        Helpers.performGet(constructURLBasedOnProps(props))
        .then(response => {
            if(response.success)
            {
                return setBooks(response.data); 
            }
            else{
                return setBooks([]);
            }
        })
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
        books?.length === 0 ? <h4>Δεν βρέθηκαν βιβλία</h4> :
            <div className="row row-cols-1 row-cols-md-5 card-custom-container">
                {books?.map(book => <BookItem key={book.id} book={book} isFavorite={favorites?.some(favorite => favorite == book.id)} addFavorite={addFavorite} />)}
            </div>
    );
}