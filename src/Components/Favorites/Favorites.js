import React from "react";
import "../../css/style.css";
import API from "../../Helpers/API";
import Helpers from "../../Helpers/Helpers";
import FavoriteItem from "./FavoriteItem";
import { UserContext } from "../../App";
import ReactPaginate from 'react-paginate';
import Loading from "../Loading";

export default function Favorites() {

    const [favorites, setFavorites] = React.useState([]);
    const [favoriteRemoved, setFavoriteRemoved] = React.useState(null);
    const user = React.useContext(UserContext);
    const [loading, setLoading] = React.useState(false);

    const [displayedItems, setDisplayedItems] = React.useState([]);
    const [pageCount, setPageCount] = React.useState(0);
    const [itemOffset, setItemOffset] = React.useState(0);

    const itemsPerPage = 5;

    React.useEffect(() => {
        if (favorites === null || favorites.length === 0)
            return;
        const endOffset = itemOffset + itemsPerPage;
        setDisplayedItems(favorites.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(favorites.length / itemsPerPage));
    }, [favorites, itemOffset])

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % favorites.length;
        setItemOffset(newOffset);
    };

    React.useEffect(() => {
        if (user.user.userId !== "") {
            setLoading(true);
            Helpers.performGet(`${API.API_URL_GET_USER_FAVORITES}${user.user.userId}`, user.user.token)
                .then(response => {
                    setLoading(false);
                    if (response.success)
                        setFavorites(response.data);
                    else
                        setFavorites([]);
                });

        }

    }, [user, favoriteRemoved]);

    const deleteFavorite = (bookId) => {

        let url = API.API_URL_DELETE_FAVORITE.replace(":userId", user.user.userId).replace(":bookId", bookId);
        Helpers.performDelete(url, user.user.token).then(response => {
            if (response.success) {
                Helpers.successMessage("Αφαιρέθηκε επιτυχώς!");
                return setFavoriteRemoved(bookId);
            }
        });

    }

    return (
        <div className="library-container">
            <h4><i className="fa-solid fa-bookmark"></i>Οι σελιδοδείκτες μου</h4>
            {
                loading ? <Loading /> :
                    <>
                        {
                            favorites == null || favorites.length == 0 ? <h5>Δεν έχετε προσθέσει σελιδοδείκτες.</h5> :
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Τίτλος</th>
                                            <th>Ημερομηνία προσθήκης</th>
                                            <th>Αναγνωσμένο</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayedItems.map(favorite => <FavoriteItem key={favorite.book.id} favorite={favorite} deleteFavorite={deleteFavorite} />)}
                                    </tbody>
                                </table>
                        }
                        {
                            favorites !== null && favorites.length > itemsPerPage && <ReactPaginate
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
            }


        </div>
    );

}