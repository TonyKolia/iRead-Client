import React from "react";
import "../../css/style.css";

export default function Publishers(props) {

    const [selectedPublishers, setSelectedPublishers] = React.useState(props.selectedPublishers);

    React.useEffect(() => {
        setSelectedPublishers(props.selectedPublishers);
    },[props.selectedPublishers])

    const handleChange = (e) => {
        props.setCategory(null);
        const { id } = e.target;
        props.setFilters(oldFilters => {
            if(oldFilters.publishers.includes(id))
                return {...oldFilters, publishers: oldFilters.publishers.filter(x => x !== id)}
            else{
                let newSelectedPublishers = [...oldFilters.publishers, id];
                return {...oldFilters, publishers: newSelectedPublishers}
            }
        })
    }

    return (
        <div>
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#publishers" aria-expanded="true" aria-controls="publishers">
                <h6><i className="fa-solid fa-book"></i>Εκδόσεις</h6>
            </button>
            <div className="filter-data-container collapse show" id="publishers">
                <ul className="list-group">
                    {
                        props.publishers?.map(publisher => {
                            return (<li key={publisher.id}>
                                <input onChange={handleChange} className="form-check-input" type="checkbox" id={publisher.id} checked={selectedPublishers.includes(String(publisher.id))} />
                                <label className="form-check-label" htmlFor={publisher.id}>{publisher.name}</label>
                            </li>)
                        })
                    }
                </ul>
            </div>
        </div>
    );

}