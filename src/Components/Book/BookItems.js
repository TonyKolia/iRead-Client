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


    const setupFilters = (props) => {
        return {
            CategoryId: props.category,
            Authors: props.filters?.authors,
            Publishers: props.filters?.publishers,
            MinYear: props.years?.minYear === undefined || props.years.minYear == 0 ? null : props.years.minYear,
            MaxYear: props.years?.maxYear === undefined || props.years.maxYear == 9999 ? null : props.years.maxYear,
            SearchString: props.searchString === undefined || props.searchString.current === '' ? "" : props.searchString.current,
            Type: type ? type : "",
            UserId: user.user.userId !== "" ? user.user.userId : null
        }
    };

    React.useEffect(() => setItemOffset(0), [props.category]);

    React.useEffect(() => {
        setLoading(true);
        Helpers.performPost(API.API_URL_GET_BOOKS_BY_FILTERS, setupFilters(props))
            .then(response => {
                setLoading(false);
                if (response.success) {
                    return setBooks(response.data);
                }
                else {
                    return setBooks([]);
                }
            })
    }, [props, user]);

    React.useEffect(() => {
        if (user.user.userId !== "") {
            Helpers.performGet(`${API.API_URL_GET_USER_FAVORITES}${user.user.userId}`, user.user.token)
                .then(response => {
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
                    Helpers.successMessage("Προστέθηκε σελιδοδείκτης!");
                    return setNewFavorite(bookId);
                }
                else
                    return alert("lol");
            });
    }

    const search = () => {

        if (props.searchString.current === "" || props.searchString.current === null)
            return;

        setLoading(true);
        Helpers.performPost(API.API_URL_GET_BOOKS_BY_FILTERS, setupFilters(props))
            .then(response => {
                setLoading(false);
                if (response.success) {
                    return setBooks(response.data);
                }
                else {
                    return setBooks([]);
                }
            })
    }

    const getColumns = () =>{
        return window.innerWidth < 1920 ? 2 : 5;
    }




    return (
        <>
            {loading && <Loading />}
            <div style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                {props.fromMain && <SearchBar reset={props.reset} search={search} searchString={props.searchString} setSearchCleared={props.setSearchCleared} />}
                <ActiveFilters activeFilters={{ category: props.category, filters: props.filters, years: props.years, searchString: props.searchString, type: type }} />
            </div>
            {
                books?.length === 0 ? <div className="not-found-container"><h3>{ loading ? "" : "Δεν βρέθηκαν βιβλία"}</h3></div> :
                    <>
                        <div className={`row row-cols-1 row-cols-md-${getColumns()} card-custom-container`} id="book-container">
                            {displayedItems?.map(book => <BookItem key={book.id} book={book} isFavorite={favorites?.some(favorite => favorite == book.id)} addFavorite={addFavorite} />)}
                        </div>
                        {
                            books !== null && books.length > itemsPerPage && <ReactPaginate
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={3}
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
            }
        </>

    );
}