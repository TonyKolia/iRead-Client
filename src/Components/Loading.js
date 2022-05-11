import React from "react";
import "../css/style.css";

export default function Loading() {
    return (
        <div className="d-flex justify-content-center loading-spinner">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}