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

    const toggleSidebar = () =>{
        let sidebar = document.getElementById("sidebar");
        let content = document.getElementById("booksContent");
        if(sidebar.classList.contains("hide")){ //show

            sidebar.classList.add("show");
            sidebar.classList.remove("hide");

            content.classList.add("retract-content");
            content.classList.remove("expand-content");
            setTimeout(() => content.style.marginLeft = "230px", 1000);
        }
        else{
            sidebar.classList.add("hide");
            sidebar.classList.remove("show");

            content.classList.add("expand-content");
            content.classList.remove("retract-content");
            setTimeout(() => content.style.marginLeft = "0px", 1000);
        }
    }

    return (
        <div>
            <Sidebar setCategory={setCategory} setFilters={setFilters} setYears={setYears} category={category} filters={filters} years={years} />
            <div className="toolbar-container">
                <button type="button" onClick={toggleSidebar} className="btn btn-primary btn-custom"><i className="fa-solid fa-arrow-left"></i></button>
                <button type="button" onClick={() => { reset(); }} className="btn btn-primary btn-custom"><i className="fa-solid fa-rotate"></i></button>
                <div className="search-container">
                    <input type="text" className="search-control" placeholder="Αναζήτηση..." />
                    <button type="button" className="btn btn-primary btn-custom btn-search"><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>
            <div className="content" id="booksContent">
                <BookItems category={category} filters={filters} years={years} />
            </div>
        </div>
    );
}