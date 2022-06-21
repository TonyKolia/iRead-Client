import React from "react";
import "../css/style.css";

export default function Loading() {

    React.useEffect(() => {

        var loadingElement = document.getElementById("loading-spinner");
        loadingElement.style.height = document.body.scrollHeight + "px";
        
    },[]);

    return (
        <div id="loading-spinner" className="d-flex justify-content-center loading-spinner">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}