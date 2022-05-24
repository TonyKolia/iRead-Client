import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import BookItems from "./Book/BookItems";
import "../css/style.css";

export default function Main() {

    const [category, setCategory] = React.useState(null);
    const [filters, setFilters] = React.useState({ authors: [], publishers: [] });
    const [years, setYears] = React.useState({ minYear: 0, maxYear: 9999 });

    const reset = () => {
        setCategory(null);
        setFilters({ authors: [], publishers: [] });
        setYears({ minYear: 0, maxYear: 9999 });
    }

    const toggleSidebar = () => {
        let sidebar = document.getElementById("sidebar");
        let content = document.getElementById("booksContent");
        let toolbar = document.getElementById("toolbar");
        let toggleIcon = document.getElementById("toggle-icon");
        let container = document.getElementById("book-container");
        if (sidebar.classList.contains("hide-sidebar")) { //show

            sidebar.classList.add("show-sidebar");
            sidebar.classList.remove("hide-sidebar");

            toolbar.classList.add("retract-toolbar");
            toolbar.classList.remove("expand-toolbar");

            content.classList.add("retract-content");
            content.classList.remove("expand-content");

            container.classList.add("row-cols-md-5");
            container.classList.remove("row-cols-md-6");
           

            setTimeout(() => {
                toolbar.style.paddingLeft = "245px";
                content.style.marginLeft = "230px";
                toggleIcon.classList.add("fa-arrow-left");
                toggleIcon.classList.remove("fa-arrow-right");

            }, 1000);
        }
        else {
            sidebar.classList.add("hide-sidebar");
            sidebar.classList.remove("show-sidebar");

            toolbar.classList.add("expand-toolbar");
            toolbar.classList.remove("retract-toolbar");

            content.classList.add("expand-content");
            content.classList.remove("retract-content");

            container.classList.add("row-cols-md-6");
            container.classList.remove("row-cols-md-5");

            setTimeout(() => {
                toolbar.style.paddingLeft = "15px";
                content.style.marginLeft = "0px";
                toggleIcon.classList.remove("fa-arrow-left");
                toggleIcon.classList.add("fa-arrow-right");

            }, 1000);
        }
    }

    return (
        <div>
            <Sidebar setCategory={setCategory} setFilters={setFilters} setYears={setYears} category={category} filters={filters} years={years} />
            <div className="toolbar-container" id="toolbar">
                <button type="button" onClick={toggleSidebar} className="btn btn-primary btn-custom btn-circle"><i id="toggle-icon" className="fa-solid fa-arrow-left"></i></button>
                <button type="button" onClick={() => { reset(); }} className="btn btn-primary btn-custom btn-circle"><i className="fa-solid fa-rotate"></i></button>
                <div className="search-container">
                    <input type="text" className="search-control" placeholder="Αναζήτηση..." />
                    <button type="button" className="btn btn-primary btn-custom btn-search btn-circle"><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>
            <div className="content" id="booksContent">
                <BookItems category={category} filters={filters} years={years} fromMain={true} />
            </div>
        </div>
    );
}