import React from "react";
import "../../css/style.css";

export default function Authors(props) {

    const [selectedAuthors, setSelectedAuthors] = React.useState(props.selectedAuthors);

    React.useEffect(() => {
        setSelectedAuthors(props.selectedAuthors);
    }, [props.selectedAuthors])

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

    return (
        <div>
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#authors" aria-expanded="true" aria-controls="authors">
                <h6><i className="fa-solid fa-feather-pointed"></i>Συγγραφείς</h6>
            </button>
            <div className="filter-data-container collapse show" id="authors">
                <ul className="list-group">
                    {
                        props.authors?.map(author => {
                            return (<li key={author.id}>
                                <input className="form-check-input" onChange={handleChange} id={`author-${author.id}`} type="checkbox" checked={selectedAuthors.includes(String(author.id))} />
                                <label className="form-check-label" htmlFor={`author-${author.id}`}>{`${author.name} ${author.surname}`}</label>
                            </li>)
                        })
                    }
                </ul>
            </div>
        </div>
    );

}
