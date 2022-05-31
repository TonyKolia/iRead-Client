import React from "react";
import BookItem from "./BookItem";
import Loading from "../Loading";
import "../../css/style.css";
import API from "../../Helpers/API";
import Helpers from "../../Helpers/Helpers";
import { UserContext } from "../../App";
import SearchBar from "./SearchBar";
import ActiveFilters from "../ActiveFilters";
import { useParams } from "react-router-dom";
import ReactPaginate from 'react-paginate';

export default function BookItems(props) {

    const itemsPerPage = 30;

    const user = React.useContext(UserContext);

    const [books, setBooks] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [newFavorite, setNewFavorite] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const { type } = useParams();

    const [displayedItems, setDisplayedItems] = React.useState([]);
    const [pageCount, setPageCount] = React.useState(0);
    const [itemOffset, setItemOffset] = React.useState(0);

    const constructURLBasedOnProps = (props) => {

        if (Object.keys(props).length === 0)
            return API.API_URL_GET_BOOK;

        let category = props.category ?? "ALL";

        let authors = "";
        props.filters?.authors.forEach(author => authors += author + "-");
        authors = authors === undefined || authors.length == 0 ? "ALL" : authors.substring(0, authors.length - 1);

        let publishers = "";
        props.filters?.publishers.forEach(publisher => publishers += publisher + "-");
        publishers = publishers === undefined || publishers.length == 0 ? "ALL" : publishers.substring(0, publishers.length - 1);

        let minYear = props.years?.minYear === undefined || props.years.minYear == 0 ? "ALL" : props.years.minYear;
        let maxYear = props.years?.maxYear === undefined || props.years.maxYear == 9999 ? "ALL" : props.years.maxYear;
        //"Book/Category/:category/Authors/:authors/Publishers/:publishers/MinYear/:minYear/MaxYear/:maxYear/SearchString/:searchString/Type/:type"

        let selectedType = props.type ? props.type + "-home" : (type ? type : "NONE");

        return API.API_URL_GET_BOOKS_BY_FILTERS.replace(":category", category).replace(":authors", authors).replace(":publishers", publishers).replace(":minYear", minYear).replace(":maxYear", maxYear).replace(":searchString", props.searchString === undefined || props.searchString.current === '' ? "%%%" : props.searchString.current).replace(":type", selectedType);
    }

    React.useEffect(() => {

        setLoading(true);
        Helpers.performGet(constructURLBasedOnProps(props))
            .then(response => {
                setLoading(false);
                if (response.success) {
                    return setBooks(response.data);
                }
                else {
                    return setBooks([]);
                }
            })
    }, [props]);

    React.useEffect(() => {
        if (user.user.userId !== "") {
            setLoading(true);
            Helpers.performGet(`${API.API_URL_GET_USER_FAVORITES}${user.user.userId}`, user.user.token)
                .then(response => {
                    setLoading(false);
                    return setFavorites(response.data?.map(x => x.book.id));
                });
        }
    }, [user, newFavorite]);

    React.useEffect(() => {
        if (books === null || books.length === 0)
            return;

        if (props.fromMain) {
            const endOffset = itemOffset + itemsPerPage;
            setDisplayedItems(books.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(books.length / itemsPerPage));
        }
        else
            setDisplayedItems(books);

    }, [books, itemOffset])


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % books.length;
        setItemOffset(newOffset);
    };

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
                    Helpers.successMessage("Προστέθηκε στους σελιδοδείκτες!");
                    return setNewFavorite(bookId);
                }

                else
                    return alert("lol");
            });
    }

    const search = () => {

        if (props.searchString.current === "" || props.searchString.current === null)
            return;

        Helpers.performGet(constructURLBasedOnProps(props))
            .then(response => {
                if (response.success) {
                    return setBooks(response.data);
                }
                else {
                    return setBooks([]);
                }
            });

    }

    return (
        <>
            <div style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                {props.fromMain && <SearchBar reset={props.reset} search={search} searchString={props.searchString} setSearchCleared={props.setSearchCleared} />}
                <ActiveFilters activeFilters={{ category: props.category, filters: props.filters, years: props.years, searchString: props.searchString, type: type }} />
            </div>

            {loading ? <Loading /> : (
                books?.length === 0 ? <h4>Δεν βρέθηκαν βιβλία</h4> :
                    <>
                        <div className={`row row-cols-1 ${props.fromMain ? "row-cols-md-5" : "row-cols-md-6"} card-custom-container`} id="book-container">
                            {displayedItems?.map(book => <BookItem key={book.id} book={book} isFavorite={favorites?.some(favorite => favorite == book.id)} addFavorite={addFavorite} />)}
                        </div>
                        {
                            props.fromMain && books !== null && books.length > itemsPerPage && <ReactPaginate
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={pageCount}
                                pageClassName="page-item"
                                pageLinkClassName="page-link fromLeft"
                                previousClassName="page-item"
                                previousLinkClassName="page-link fromLeft"
                                nextClassName="page-item"
                                nextLinkClassName="page-link fromLeft"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link fromLeft"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                                previousLabel="&laquo;"
                                nextLabel="&raquo;"
                            />
                        }
                    </>
            )}
        </>

    );
}