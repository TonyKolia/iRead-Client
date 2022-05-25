import React from "react";
import "../../css/style.css";
import ActiveFilters from "../ActiveFilters";

export default function SearchBar(props) {

    const handleChange = (e) => {
        const { value } = e.target;
        props.searchString.current = value;
        if (value === "" || value === null) {
            document.getElementById("clearSearch").style.visibility = "hidden";
            props.setSearchCleared(oldValue => !oldValue);
        }
        else {
            document.getElementById("clearSearch").style.visibility = "visible";
        }
    }

    const toggleSidebar = () => {
        let sidebar = document.getElementById("sidebar");
        let content = document.getElementById("booksContent");
        let toggleIcon = document.getElementById("toggle-icon");
        let container = document.getElementById("book-container");
        if (sidebar.classList.contains("hide-sidebar")) { //show

            sidebar.classList.add("show-sidebar");
            sidebar.classList.remove("hide-sidebar");

            content.classList.add("retract-content");
            content.classList.remove("expand-content");

            container.classList.add("row-cols-md-5");
            container.classList.remove("row-cols-md-6");

            setTimeout(() => {
                content.style.marginLeft = "230px";
                toggleIcon.classList.add("fa-arrow-left");
                toggleIcon.classList.remove("fa-arrow-right");

            }, 1000);
        }
        else {
            sidebar.classList.add("hide-sidebar");
            sidebar.classList.remove("show-sidebar");

            content.classList.add("expand-content");
            content.classList.remove("retract-content");

            container.classList.add("row-cols-md-6");
            container.classList.remove("row-cols-md-5");

            setTimeout(() => {
                content.style.marginLeft = "0px";
                toggleIcon.classList.remove("fa-arrow-left");
                toggleIcon.classList.add("fa-arrow-right");

            }, 1000);
        }
    }

    const clearSearch = () => {
        document.getElementById("searchField").value = "";
        document.getElementById("clearSearch").style.visibility = "hidden";
        props.setSearchCleared(oldValue => !oldValue);
        props.searchString.current = "";
    }

    return (
        <>
            <div className="toolbar-container" id="toolbar">
                <button type="button" onClick={toggleSidebar} className="btn btn-primary btn-custom btn-circle"><i id="toggle-icon" className="fa-solid fa-arrow-left"></i></button>
                <button type="button" onClick={() => { props.reset(); }} className="btn btn-primary btn-custom btn-circle"><i className="fa-solid fa-rotate"></i></button>
                <div className="search-container">
                    <input type="text" onChange={handleChange} id="searchField" className="search-control" placeholder="Αναζήτηση..." />
                    <button className="btn clear-search-btn" id="clearSearch" title="Καθαρισμός" onClick={clearSearch}><i className="fa-solid fa-xmark"></i></button>
                    <button type="button" onClick={() => props.search()} className="btn btn-primary btn-custom btn-search btn-circle"><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>
        </>
    );

}