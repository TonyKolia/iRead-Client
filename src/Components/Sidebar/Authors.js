import React from "react";
import "../../css/style.css";

export default function Authors(props) {

    const authors = [];
    props.authors?.map(author => {
        authors.push(<li key={author.id}>
                        <input className="form-check-input" type="checkbox" value={author.id} id={author.id} />
                        <label className="form-check-label" for="flexCheckDefault">{`${author.name} ${author.surname}`}</label>
                    </li>);
    });

    return (
        <div>
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#authors" aria-expanded="true" aria-controls="authors">
                <h6><i className="fa-solid fa-feather-pointed"></i>Συγγραφείς</h6>
            </button>
            <div className="filter-data-container collapse show" id="authors">
                <ul className="list-group">
                    {authors}
                </ul>
            </div>
        </div>
    );

}
