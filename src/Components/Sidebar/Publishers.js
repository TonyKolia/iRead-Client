import React from "react";
import "../../css/style.css";

export default function Publishers(props) {

    const publishers = [];
    props.publishers?.map(publisher => {
        publishers.push(
        <li key={publisher.id}>
            <input className="form-check-input" type="checkbox" value={publisher.id} id={publisher.id} />
            <label className="form-check-label" for="flexCheckDefault">{publisher.name}</label>
        </li>);
    });

    return (
        <div>
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#publishers" aria-expanded="true" aria-controls="publishers">
                <h6><i className="fa-solid fa-book"></i>Εκδόσεις</h6>
            </button>
            <div className="filter-data-container collapse show" id="publishers">
                <ul className="list-group">
                    {publishers}
                </ul>
            </div>
        </div>
    );

}