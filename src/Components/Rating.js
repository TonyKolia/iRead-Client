import React from "react";
import "../css/style.css";

export default function Rating(props) {

    let stars = [];
    for(var i=0; i<props.rating.rating; i++){
        stars.push(<i className="fa-solid fa-star"></i>);
    }

    for(var i=0; i<5-props.rating.rating; i++){
        stars.push(<i class="fa-regular fa-star"></i>)
    }

    return (
        <div>
            <div className="comment-user">
                <img className="profile-img-avatar" src={require("../Images/avatar.png")} />
                <div style={{ padding: "1rem" }}>
                    {stars}
                    <div>
                        <span style={{ fontSize: "small" }}>{props.rating.username} στις {formatDate(props.rating.dateAdded)}</span>
                    </div>
                </div>
            </div>
            <div>
                <span>{props.rating.comment}</span>
            </div>
        </div>
    );


}

function formatDate(date){

    if(date !== undefined && date !== null){
        let newDate = new Date(date);
        return  (newDate?.getDate() + "/" + (newDate?.getMonth() + 1) + "/" + newDate?.getFullYear());
    }

    return "";
}