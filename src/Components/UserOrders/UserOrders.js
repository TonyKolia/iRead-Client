import React from "react";
import { useParams } from "react-router-dom";
import "../../css/style.css";
import API from "../../Helpers/API";
import Helpers from "../../Helpers/Helpers";
import Orders from "./OrderItem";
import { UserContext } from "../../App";
import ReactPaginate from 'react-paginate';

export default function UserOrders() {

    const [orders, setOrders] = React.useState([]);
    const user = React.useContext(UserContext);

    const [displayedItems, setDisplayedItems] = React.useState([]);
    const [pageCount, setPageCount] = React.useState(0);
    const [itemOffset, setItemOffset] = React.useState(0)

    const itemsPerPage = 5;

    React.useEffect(() => {
        if (user.user.userId !== "")
            Helpers.performGet(`${API.API_URL_GET_USER_ORDERS}${user.user.userId}`, user.user.token).then(response => setOrders(response.data));
    }, [user]);

    React.useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setDisplayedItems(orders.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(orders.length / itemsPerPage));
    }, [orders, itemOffset])

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % orders.length;
        setItemOffset(newOffset);
    };

    return (
        <div className="orders">
            <h4 style={{ paddingBottom: "2rem" }}><i className="fa-solid fa-book"></i>Οι κρατήσεις μου</h4>
            {
                orders?.length == 0 ? <h5>Δεν βρέθηκαν κρατήσεις.</h5> :
                    <>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Αριθμός κράτησης</th>
                                    <th>Ημερομηνία κράτησης</th>
                                    <th>Ημερομηνία επιστροφής</th>
                                    <th>Κατάσταση</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedItems.map(order => <Orders key={order.id} order={order} />)}
                            </tbody>
                        </table>

                        {orders?.length > pageCount && <ReactPaginate
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
                        />}
                    </>
            }



        </div>
    );

}