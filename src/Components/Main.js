import React from "react";
import Sidebar from "./Sidebar";
import BookItems from "./BookItems";
import "../css/style.css";

export default function Main() {
    return (
        <div>
            <Sidebar />
            <div className="toolbar-container">
                <button type="button" className="btn btn-primary btn-custom" data-bs-toggle="collapse" data-bs-target="#sidebar" role="button" aria-expanded="false" aria-controls="sidebar"><i className="fa-solid fa-arrow-left"></i></button>
                <button type="button" className="btn btn-primary btn-custom"><i className="fa-solid fa-rotate"></i></button>
                <div className="search-container">
                    <input type="text" className="search-control" placeholder="Αναζήτηση..." />
                    <button type="button" className="btn btn-primary btn-custom btn-search"><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>
            <div className="content">
                <BookItems />
            </div>
        </div>
    );
}