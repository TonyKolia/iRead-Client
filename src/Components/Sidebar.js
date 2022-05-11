import React from "react";
import "../css/style.css";
import API from "../Helpers/API";
import Categories from "./Sidebar/Categories";
import Publishers from "./Sidebar/Publishers";
import Authors from "./Sidebar/Authors";
import Years from "./Sidebar/Year";

export default function Sidebar() {

    const [criteria, setCriteria] = React.useState({});

    React.useEffect(() => {
        fetch(API.API_URL_GET_CRITERIA)
        .then(res => res.json())
        .then(res => setCriteria(res.data));
    }, []);

    return (
        <div className="collapse show" id="sidebar">
            <div className="sidebar">
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h5 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <h5><i className="fa-solid fa-filter"></i>Φίλτρα</h5>
                            </button>
                        </h5>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body" id="filterData">
                                <Authors authors={criteria.authors} />
                                <Publishers publishers={criteria.publishers} />
                                <Years />
                            </div>
                        </div>
                    </div>
                    <Categories categories={criteria.categories} />
                </div>
            </div>
        </div>
    );
}