import Rating from "./Rating";
import React from "react";
import "../../css/style.css";
import API from "../../Helpers/API";
import Helpers from "../../Helpers/Helpers";
import RatingModal from "./RatingModal";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

export default function Ratings(props) {

    const [ratings, setRatings] = React.useState({});
    const [reloadRatings, setReloadRatings] = React.useState(false) //used as a toggle to force a reload
    const [loading, setLoading] = React.useState(false);
    let navigate = useNavigate();

    React.useEffect(() => {

        if (props.bookId === undefined)
            return;

        setLoading(true);
        Helpers.performGet(API.API_URL_GET_BOOK_RATINGS.replace(":bookId", props.bookId))
            .then(response => {
                setLoading(false);
                if (response.success)
                    return setRatings(response.data);
                else return response.statusCode == 404 ? setRatings({}) : navigate("/error");
            });

    }, [props.bookId, reloadRatings]);

    return (
        <>
            {loading && <Loading />}
            <div className="comments-container" id="ratings">
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", paddingTop: "1rem" }}>
                    <h4><i className="fa-solid fa-comment"></i>Σχόλια χρηστών</h4>
                </div>
                <div id="comments">

                    {
                        ratings.ratings != undefined && ratings.ratings.length > 0 ?
                            <ul className="list-group">
                                {ratings.ratings.map(rating => <li key={rating.username} className="list-group-item"><Rating key={rating.username} rating={rating} /></li>)}
                            </ul>
                            :
                            <h5 style={{ textAlign: "center", paddingTop: "2rem" }}>{loading ? "" : "Δεν υπάρχουν σχόλια χρηστών."}</h5>
                    }
                </div>
            </div>
            <RatingModal bookId={props.bookId} bookTitle={props.bookTitle} ratings={ratings} setReloadRatings={setReloadRatings} setReloadBook={props.setReloadBook} />
        </>
    );
}