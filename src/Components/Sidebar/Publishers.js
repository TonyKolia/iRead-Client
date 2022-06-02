import React from "react";
import "../../css/style.css";

export default function Publishers(props) {

    const [searchString, setSearchString] = React.useState("");
    const [selectedPublishers, setSelectedPublishers] = React.useState(props.selectedPublishers);
    const [displayedPublishers, setDisplayePublishers] = React.useState(props.publishers);
    let letter = "";

    React.useEffect(() => {
        setSelectedPublishers(props.selectedPublishers);
    }, [props.selectedPublishers])

    React.useEffect(() => {
        setDisplayePublishers(props.publishers);
    }, [props.publishers])

    React.useEffect(() => {

        if (searchString === "")
            setDisplayePublishers(props.publishers);
        else
            setDisplayePublishers(props.publishers.filter(publisher => publisher.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(searchString.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))));

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
            if (oldFilters.publishers.includes(id))
                return { ...oldFilters, publishers: oldFilters.publishers.filter(x => x !== id) }
            else {
                let newSelectedPublishers = [...oldFilters.publishers, id];
                return { ...oldFilters, publishers: newSelectedPublishers }
            }
        })
    }

    const clearAuthorSearch = () =>{
        setSearchString("");
    }

    return (
        <div>
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#publishers" aria-expanded="true" aria-controls="publishers">
                <h6><i className="fa-solid fa-book"></i>Εκδόσεις</h6>
            </button>
            <div className="collapse show" id="publishers">
                <div className="form-control-container" id="filter-search-author">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" value={searchString} name="search-author" onChange={handleSearchChange} placeholder="Αναζήτηση..." />
                    {searchString !== "" && <i onClick={clearAuthorSearch} className="fa-solid fa-xmark"></i>}
                </div>
                <div className="filter-data-container" id="publisher-list">
                    <ul className="list-group">
                        {
                            displayedPublishers?.map(publisher => {

                                let normalizedFirstLetter = publisher.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").substring(0, 1);
                                let letterChanged = false;
                                if (normalizedFirstLetter !== letter) {
                                    letter = normalizedFirstLetter;
                                    letterChanged = true;
                                }

                                return (
                                    <>
                                        {letterChanged && <h6 className="letter-seperator">{letter}</h6>}
                                        <li key={publisher.id}>
                                            <input onChange={handleChange} className="form-check-input" type="checkbox" id={`publisher-${publisher.id}`} checked={selectedPublishers.includes(String(publisher.id))} />
                                            <label className="form-check-label" title={publisher.name} htmlFor={`publisher-${publisher.id}`}>{publisher.name}</label>
                                        </li>
                                    </>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>

        </div>
    );

}