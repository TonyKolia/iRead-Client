import React from "react";
import BookItem from "./BookItem";
import Loading from "../Loading";
import "../../css/style.css";
import API from "../../Helpers/API";
import Helpers from "../../Helpers/Helpers";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "bootstrap";

export default function BookItems(props) {

    const [selected, setSelected] = React.useState("recommended");
    const changeSelected = (name) => setSelected(name);

    let navigate = useNavigate();

    const user = React.useContext(UserContext);
    const [books, setBooks] = React.useState({ recommended: [], new: [], hot: [] });
    const [favorites, setFavorites] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        var url = API.API_URL_GET_BOOKS_FOR_HOME.replace(":userId", user.user.userId);
        Helpers.performGet(url)
            .then(response => {
                setLoading(false);
                if (response.success) {
                    return setBooks({ recommended: response.data.recommended, new: response.data.new, hot: response.data.hot });
                }
                else
                    return response.statusCode == 404 ? setBooks({ recommended: [], new: [], hot: [] }) : navigate("/error");
            });

        if (user.user.userId !== "") {
            Helpers.performGet(`${API.API_URL_GET_USER_FAVORITES}${user.user.userId}`, user.user.token)
                .then(response => {
                    if (response.success)
                        return setFavorites(response.data?.map(x => x.book.id));
                    else
                        return response.statusCode == 404 ? setFavorites([]) : navigate("/error");
                });
        }

    }, [user]);

    const addFavorite = (bookId) => {

        if (user.user.userId == "") {
            let loginLink = document.getElementById("loginLink");
            loginLink.click();
            return;
        }

        setLoading(true);
        Helpers.performPost(API.API_URL_ADD_NEW_FAVORITE, { userId: user.user.userId, bookId: bookId }, user.user.token)
            .then(response => {
                setLoading(false);
                if (response.success) {
                    Helpers.successMessage("Προστέθηκε σελιδοδείκτης!");
                    return setFavorites(oldFavorites => [...oldFavorites, bookId]);
                }
                else
                    return navigate("/error");
            });
    }


    const getColumns = () => window.innerWidth < 1920 ? 3 : 6;





    return (
        <>
            {loading && <Loading />}
            <div style={{ marginTop: "10px" }}>
                <ul className="nav justify-content-center mini-menu">
                    <li onClick={() => changeSelected("recommended")} key="recommended" className={`mini-menu-item fromLeft ${selected == "recommended" ? "selected" : ""}`}>Προτεινόμενα</li>
                    <li onClick={() => changeSelected("new")} key="new" className={`mini-menu-item fromLeft ${selected == "new" ? "selected" : ""}`}>Νεότερα</li>
                    <li onClick={() => changeSelected("hot")} key="hot" className={`mini-menu-item fromLeft ${selected == "hot" ? "selected" : ""}`}>Δημοφιλή</li>
                </ul>
            </div>

            {
                (
                    books?.length === 0 ? <div className="not-found-container"><h3>Δεν βρέθηκαν βιβλία</h3></div> :
                        <div style={{ marginTop: "10px", minHeight: "606px" }}>
                            <div className={`row row-cols-1 row-cols-md-${getColumns()} card-custom-container`} id="book-container">
                                {selected === "recommended" && books.recommended?.map(book => <BookItem key={book.id} book={book} isFavorite={favorites?.some(favorite => favorite == book.id)} addFavorite={addFavorite} />)}
                                {selected === "new" && books.new?.map(book => <BookItem key={book.id} book={book} isFavorite={favorites?.some(favorite => favorite == book.id)} addFavorite={addFavorite} />)}
                                {selected === "hot" && books.hot?.map(book => <BookItem key={book.id} book={book} isFavorite={favorites?.some(favorite => favorite == book.id)} addFavorite={addFavorite} />)}
                            </div>
                            <div className="home-more">
                                <h6><a href={`/books/${selected}`}>Δείτε περισσότερα...</a></h6>
                            </div>
                        </div>
                )}
        </>
    );
}