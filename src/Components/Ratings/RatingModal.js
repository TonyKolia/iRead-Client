import React from "react";
import "../../css/style.css";
import { UserContext } from "../../App";
import API from "../../Helpers/API";
import Helpers from "../../Helpers/Helpers";

export default function RatingModal(props) {

    const user = React.useContext(UserContext);
    const [rating, setRating] = React.useState({ rating: 0, comment: "" });
    const [hasExistingRating, setHasExistingRating] = React.useState(false);

    const ratings = [5, 4, 3, 2, 1];

    React.useEffect(() => {
        let existingUserRating = props.ratings?.ratings?.find(r => r.username === user.user.username);
        if (existingUserRating !== undefined) {
            setHasExistingRating(true);
            setRating({ ...existingUserRating });
        }
        else {
            setHasExistingRating(false);
            setRating({ rating: 0, comment: "" });
        }
    }, [props.ratings]);

    const handleChange = (e) => {
        setRating((oldRating) => {
            return ({
                ...oldRating,
                [e.target.name]: e.target.value
            });
        });
    }

    const addRating = () => {

        if (user.user.userId === "") {
            let loginLink = document.getElementById("loginLink");
            loginLink.click();
            return;
        }

        Helpers.performPost(API.API_URL_ADD_RATING, {
            userId: user.user.userId,
            bookId: props.bookId,
            rating: rating.rating,
            comment: rating.comment
        }, user.user.token)
            .then(response => {
                if (response.success) {
                    let closeButton = document.getElementById("closeRatingModal");
                    if (closeButton)
                        closeButton.click();
                    Helpers.successMessage("Ολοκληρώθηκε επιτυχώς!");
                    props.setReloadRatings((oldState) => !oldState);
                    return props.setReloadBook((oldState) => !oldState);
                }
                else
                    alert("lololo");
            })
    }

    const deleteRating = () => {

        var url = API.API_URL_DELETE_BOOK_RATING.replace(":userId", user.user.userId).replace(":bookId", props.bookId);
        Helpers.performDelete(url, user.user.token)
            .then(response => {
                if (response.success) {
                    let closeButton = document.getElementById("closeRatingModal");
                    if (closeButton)
                        closeButton.click();
                    Helpers.successMessage("Ολοκληρώθηκε επιτυχώς!");
                    props.setReloadRatings((oldState) => !oldState);
                    return props.setReloadBook((oldState) => !oldState);
                }
            });
    }

    const updateRating = () => {
        Helpers.performPut(API.API_URL_ADD_RATING, {
            userId: user.user.userId,
            bookId: props.bookId,
            rating: rating.rating,
            comment: rating.comment
        }, user.user.token)
            .then(response => {
                if (response.success) {
                    let closeButton = document.getElementById("closeRatingModal");
                    if (closeButton)
                        closeButton.click();
                    Helpers.successMessage("Ολοκληρώθηκε επιτυχώς!");
                    props.setReloadRatings((oldState) => !oldState);
                    return props.setReloadBook((oldState) => !oldState);
                }
                else
                    alert("lololo");
            })
    }

    return (
        <div className="modal" tabIndex="-1" id="rating-modal" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content login-modal">
                    <div className="modal-header">
                        <h5 style={{ textAlign: "center", width: "100%" }}>{props.bookTitle}</h5>
                        <button type="button" id="closeRatingModal" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{ paddingLeft: "50px", paddingRight: "50px", textAlign: "center" }}>
                        <div className="rating-container">
                            {ratings.map(r => <i key={r} onClick={() => setRating(oldRating => ({ ...oldRating, rating: r }))} className={`fa-solid fa-star ${r > rating.rating ? "" : "filled-star"}`}></i>)}
                        </div>
                        <textarea onChange={handleChange} className="form-control" value={rating.comment} name="comment" style={{ resize: "none" }} rows="4" placeholder="Σχόλιο (Προαιρετικό)"></textarea>
                        <div className="rating-actions-container">
                            {hasExistingRating && <button onClick={deleteRating} className="btn btn-primary btn-custom"><i className="fa-solid fa-trash-can"></i>Διαγραφή</button>}
                            {hasExistingRating && <button onClick={updateRating} className="btn btn-primary btn-custom"><i className="fa-solid fa-floppy-disk"></i>Αποθήκευση</button>}
                        </div>
                        {!hasExistingRating && <button onClick={addRating} className="btn btn-primary btn-custom"><i className="fa-solid fa-check"></i>Υποβολή</button>}

                    </div>
                </div>
            </div>
        </div>
    );

}