import Rating from "./Rating";
import React from "react";
import "../../css/style.css";
import API from "../../Helpers/API";
import Helpers from "../../Helpers/Helpers";
import RatingModal from "./RatingModal";

export default function Ratings(props) {

    const [ratings, setRatings] = React.useState({});
    const [reloadRatings, setReloadRatings] = React.useState(false) //used as a toggle to force a reload

    React.useEffect(() => {

        Helpers.performGet(API.API_URL_GET_BOOK_RATINGS.replace(":bookId", props.bookId))
            .then(response => {
                if (response.success)
                    return setRatings(response.data);
            });
    }, [props.bookId, reloadRatings]);

    return (
        <>
            <div className="comments-container" >
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", paddingTop: "1rem" }}>
                    <h4><i className="fa-solid fa-comment"></i>Σχόλια χρηστών</h4>
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#comments" aria-expanded="true" aria-controls="comments"></button>
                </div>
                <div id="comments" className="collapse show">

                    {
                        ratings.ratings != undefined && ratings.ratings.length > 0 ?
                            <ul className="list-group">
                                {ratings.ratings.map(rating => <li key={rating.username} className="list-group-item"><Rating key={rating.username} rating={rating} /></li>)}
                            </ul>
                            :
                            <h5 style={{ textAlign: "center", paddingTop: "2rem" }}>Δεν υπάρχουν σχόλια χρηστών.</h5>
                    }
                </div>
            </div>
            <RatingModal bookId={props.bookId} bookTitle = {props.bookTitle} ratings={ratings} setReloadRatings = {setReloadRatings} />
        </>
    );
}