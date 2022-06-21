import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import BookItems from "./Book/BookItems";
import "../css/style.css";
import { useNavigate } from "react-router-dom";

export default function Main() {

    const navigate = useNavigate();

    const [category, setCategory] = React.useState(null);
    const [filters, setFilters] = React.useState({ authors: [], publishers: [] });
    const [years, setYears] = React.useState({ minYear: 0, maxYear: 9999 }); 
    const searchString = React.useRef("");
    const [searchCleared, setSearchCleared] = React.useState(false);


    const reset = () => {
        setCategory(null);
        setFilters({ authors: [], publishers: [] });
        setYears({ minYear: 0, maxYear: 9999 });
        searchString.current = "";
        document.getElementById("searchField").value = "";
        document.getElementById("clearSearch").style.visibility = "hidden";
        setSearchCleared(false);
        navigate("/books");
    }

    return (
        <div>
            <Sidebar setCategory={setCategory} setFilters={setFilters} setYears={setYears} category={category} filters={filters} years={years} />
            <div className="content" id="booksContent">
                <BookItems category={category} filters={filters} years={years} fromMain={true} searchString={searchString} reset={reset} setSearchCleared={setSearchCleared} />
            </div>
        </div>
    );
}