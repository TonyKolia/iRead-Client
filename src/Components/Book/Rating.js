import React from "react";
import "../../css/style.css";
import Helpers from "../../Helpers/Helpers";

export default function Rating(props) {

    let stars = [];
    for(var i=0; i<props.rating.rating; i++){
        stars.push(<i key={`filled${i}`} className="fa-solid fa-star filled-star"></i>);
    }

    for(var i=0; i<5-props.rating.rating; i++){
        stars.push(<i key={`empty${i}`} className="fa-solid fa-star empty-star"></i>)
    }

    return (
        <div>
            <div className="comment-user">
                <img className="profile-img-avatar" src={require("../../Images/avatar.png")} />
                <div style={{ padding: "1rem" }}>
                    {stars}
                    <div>
                        <span style={{ fontSize: "small" }}>{props.rating.username} στις {Helpers.formatDate(props.rating.dateAdded)}</span>
                    </div>
                </div>
            </div>
            <div>
                <span>{props.rating.comment}</span>
            </div>
        </div>
    );


}