import React from "react";
import "../../css/style.css";

export default function Authors(props) {

    const [selectedAuthors, setSelectedAuthors] = React.useState(props.selectedAuthors);
    const [searchString, setSearchString] = React.useState("");
    const [displayedAuthors, setDisplayedAuthors] = React.useState(props.authors);
    let letter = "";

    React.useEffect(() => {
        setSelectedAuthors(props.selectedAuthors);
    }, [props.selectedAuthors])

    React.useEffect(() => {
        setDisplayedAuthors(props.authors);
    }, [props.authors])

    React.useEffect(() => {

        if (searchString === "")
            setDisplayedAuthors(props.authors);
        else
            setDisplayedAuthors(props.authors.filter(author => author.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(searchString.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))));

    }, [searchString])

    const handleSearchChange = (e) => {
        let { value } = e.target;
        setSearchString(value);
    }

    const handleChange = (e) => {

        props.setCategory(null);
        let { id } = e.target;
        id = id.split('-')[1];
        props.setFilters(oldFilters => {
            if (oldFilters.authors.includes(id))
                return { ...oldFilters, authors: oldFilters.authors.filter(x => x !== id) }
            else {
                let newSelectedAuthors = [...oldFilters.authors, id];
                return { ...oldFilters, authors: newSelectedAuthors }
            }
        })
    }

    const clearAuthorSearch = () =>{
        setSearchString("");
    }

    return (
        <div>
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#authors" aria-expanded="true" aria-controls="authors">
                <h6><i className="fa-solid fa-feather-pointed"></i>Συγγραφείς</h6>
            </button>
            <div className="collapse show" id="authors">
                <div className="form-control-container" id="filter-search-author">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" name="search-author" value={searchString} onChange={handleSearchChange} placeholder="Αναζήτηση..." />
                    {searchString !== "" && <i onClick={clearAuthorSearch} className="fa-solid fa-xmark"></i>}
                </div>
                <div className="filter-data-container" id="author-list">

                    <ul className="list-group">
                        {
                            displayedAuthors?.map(author => {

                                let normalizedFirstLetter = author.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").substring(0, 1);
                                let letterChanged = false;
                                if(normalizedFirstLetter !== letter){
                                    letter = normalizedFirstLetter;
                                    letterChanged = true;
                                }

                                return (
                                    <>
                                        {letterChanged  && <h6 className="letter-seperator">{letter}</h6>}
                                        <li key={author.id}>
                                            <input className="form-check-input" onChange={handleChange} id={`author-${author.id}`} type="checkbox" checked={selectedAuthors.includes(String(author.id))} />
                                            <label className="form-check-label" htmlFor={`author-${author.id}`}>{`${author.name}`}</label>
                                        </li>
                                    </>)

                            })
                        }
                    </ul>
                </div>
            </div>

        </div>
    );

}
