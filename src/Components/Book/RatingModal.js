import React from "react";
import "../../css/style.css";
import { UserContext } from "../../App";
import API from "../../Helpers/API";
import Helpers from "../../Helpers/Helpers";
import { useNavigate } from "react-router-dom";

export default function RatingModal(props) {

    const navigate = useNavigate();
    const user = React.useContext(UserContext);
    const [rating, setRating] = React.useState({ rating: 0, comment: "" });

    const ratings = [5, 4, 3, 2, 1];

    const handleChange = (e) => {
        setRating((oldRating) => {
            return ({
                ...oldRating,
                [e.target.name]: e.target.value
            });
        });
    }

    const addRating = () => {

        if(user.user.userId === "")
            return alert("login man");

        Helpers.performPost(API.API_URL_ADD_RATING, {
            userId: user.user.userId,
            bookId: props.book.id,
            rating: rating.rating,
            comment: rating.comment
        }, user.user.token)
        .then(response => {
            if(response.success)
                return navigate(`/Book/${props.book.id}`);
            else
                alert("lololo");
        })
    }

    return (
        <div className="modal" tabIndex="-1" id="rating-modal" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content login-modal">
                    <div className="modal-header">
                        <h5 style={{ textAlign: "center", width: "100%" }}>{props.book.title}</h5>
                        <button type="button" id="closeModal" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{ paddingLeft: "50px", paddingRight: "50px", textAlign: "center" }}>
                        <div className="rating-container">
                            {ratings.map(r => <i key={r} onClick={() => setRating(oldRating => ({ ...oldRating, rating: r }))} className={`fa-solid fa-star ${r > rating.rating ? "" : "filled-star"}`}></i>)}
                        </div>
                        <textarea onChange={handleChange} className="form-control" value={rating.comment} name="comment" style={{ resize: "none" }} rows="4" placeholder="Σχόλιο (Προαιρετικό)"></textarea>
                        <button onClick={addRating} className="btn btn-primary btn-custom"><i className="fa-solid fa-check"></i>Υποβολή</button>
                    </div>
                </div>
            </div>
        </div>
    );

}