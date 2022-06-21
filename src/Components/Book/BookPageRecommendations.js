import React from "react";
import "../../css/style.css";
import { UserContext } from "../../App";
import API from "../../Helpers/API";
import Helpers from "../../Helpers/Helpers";
import { useNavigate } from "react-router-dom";
import BookItem from "./BookItem";
import Loading from "../Loading";

export default function BookPageRecommendations(props) {

    let user = React.useContext(UserContext);
    let navigate = useNavigate();

    const [recommendedBooks, setRecommendedBooks] = React.useState({ recommendedForUser: [], recommendedByOthers: [], similar: [] });
    const [selectedTab, setSelectedTab] = React.useState(1);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {

        if (props.bookId === undefined)
            return;

        setLoading(true);
        var url = user.user.userId !== "" ? API.API_URL_GET_RECOMMENDATIONS_BY_BOOK_AND_USER.replace(":userId", user.user.userId).replace(":bookId", props.bookId) : API.API_URL_GET_RECOMMENDATIONS_BY_BOOK.replace(":bookId", props.bookId);
        Helpers.performGet(url, user.user.token)
            .then(response => {
                setLoading(false);
                if (response.success)
                    setRecommendedBooks({
                        recommendedForUser: response.data.userRecommendations,
                        recommendedByOthers: response.data.otherUsersRecommendations,
                        similar: response.data.similarRecommendations
                    });
                else
                    return response.statusCode == 404 ? setRecommendedBooks({ recommendedForUser: [], recommendedByOthers: [], similar: [] }) : navigate("/error");
            });

    }, [props, user]);

    return (
        <>
            {loading && <Loading />}
            <div className="comments-container">
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", paddingTop: "1rem" }}>
                    <h4><i className="fa-solid fa-thumbs-up"></i>Προτεινόμενα</h4>
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#recommended" aria-expanded="true" aria-controls="recommended"></button>
                </div>
                <div id="recommended" className="collapse show">
                    <div style={{ marginTop: "10px" }}>
                        <ul className="nav justify-content-center mini-menu">
                            <li onClick={() => setSelectedTab(1)} key="recommended" className={`mini-menu-item fromLeft ${selectedTab == 1 ? "selected" : ""}`}>Για εσάς</li>
                            <li onClick={() => setSelectedTab(2)} key="new" className={`mini-menu-item fromLeft ${selectedTab == 2 ? "selected" : ""}`}>Άλλοι χρήστες δανείστηκαν</li>
                            <li onClick={() => setSelectedTab(3)} key="hot" className={`mini-menu-item fromLeft ${selectedTab == 3 ? "selected" : ""}`}>Παρόμοια</li>
                        </ul>
                    </div>
                    {
                        selectedTab == 1 && <div style={{ marginTop: "10px" }} className="row row-cols-1 row-cols-md-4 card-custom-container book-page-recommendations">
                            {recommendedBooks.recommendedForUser?.length === 0 ? <div className="not-found-container"><h3>{loading ? "" : "Δεν βρέθηκαν βιβλία."}</h3></div> : recommendedBooks.recommendedForUser?.map(book => <BookItem key={book.id} book={book} />)}
                        </div>
                    }
                    {
                        selectedTab == 2 && <div style={{ marginTop: "10px" }} className="row row-cols-1 row-cols-md-4 card-custom-container book-page-recommendations">
                            {recommendedBooks.recommendedByOthers?.length === 0 ? <div className="not-found-container"><h3>{loading ? "" : "Δεν βρέθηκαν βιβλία."}</h3></div> : recommendedBooks.recommendedByOthers?.map(book => <BookItem key={book.id} book={book} />)}
                        </div>
                    }
                    {
                        selectedTab == 3 && <div style={{ marginTop: "10px" }} className="row row-cols-1 row-cols-md-4 card-custom-container book-page-recommendations">
                            {recommendedBooks.similar?.length === 0 ? <div className="not-found-container"><h3>{loading ? "" : "Δεν βρέθηκαν βιβλία."}</h3></div> : recommendedBooks.similar?.map(book => <BookItem key={book.id} book={book} />)}
                        </div>
                    }
                </div>
                <hr />

            </div>
        </>
    );

}