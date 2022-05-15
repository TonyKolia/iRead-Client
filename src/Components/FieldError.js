import React from "react";
import "../css/style.css";

export default function FieldError(props){

    return(
        <div className="field-error">
            <small><span><i className="fa-solid fa-circle-exclamation"></i>{props.error}</span></small>
        </div>
    );
}