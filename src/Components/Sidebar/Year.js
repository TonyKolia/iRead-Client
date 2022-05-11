import React from "react";
import "../../css/style.css";

export default function Years() {
    return (
        <div>
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#year" aria-expanded="true" aria-controls="year">
                <h6><i className="fa-solid fa-calendar"></i>Έτος</h6>
            </button>
            <div className="filter-data-container collapse show" id="year">
                <input type="range" className="form-range" id="customRange1" style={{ marginTop: "5px" }} />
            </div>
        </div>
    );
}