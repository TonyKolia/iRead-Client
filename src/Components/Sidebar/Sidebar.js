import React from "react";
import "../../css/style.css";
import API from "../../Helpers/API";
import Categories from "./Categories";
import Publishers from "./Publishers";
import Authors from "./Authors";
import Years from "./Year";

export default function Sidebar(props) {

    const [criteria, setCriteria] = React.useState({});

    React.useEffect(() => {
        fetch(API.API_URL_GET_CRITERIA)
            .then(res => res.json())
            .then(res => setCriteria(res.data));
    }, []);

    return (
        <div className="sidebar" id="sidebar">
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h5 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <h5><i className="fa-solid fa-filter"></i>Φίλτρα</h5>
                        </button>
                    </h5>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body" id="filterData">
                            <Authors authors={criteria.authors} setFilters={props.setFilters} selectedAuthors={props.filters.authors} setCategory={props.setCategory} />
                            <Publishers publishers={criteria.publishers} setFilters={props.setFilters} selectedPublishers={props.filters.publishers} setCategory={props.setCategory} />
                            <Years years={{ minYear: criteria.minYear, maxYear: criteria.maxYear }} selectedYears={props.years} setYears={props.setYears} setCategory={props.setCategory} />
                        </div>
                    </div>
                </div>
                <Categories categories={criteria.categories} setCategory={props.setCategory} setFilters={props.setFilters} selectedCategory={props.category} setYears={props.setYears} />
            </div>
        </div>
    );
}