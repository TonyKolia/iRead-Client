import React from "react";
import "../css/style.css";

export default function Sidebar() {

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
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#authors" aria-expanded="true" aria-controls="authors">
                                    <h6><i className="fa-solid fa-feather-pointed"></i>Συγγραφείς</h6>
                                </button>
                                <div className="filter-data-container collapse show" id="authors">
                                    <ul className="list-group">
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" for="flexCheckDefault">Author 1</label>
                                        </li>
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" for="flexCheckDefault">Author 1</label>
                                        </li>
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" for="flexCheckDefault">Author 1</label>
                                        </li>
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" for="flexCheckDefault">Author 1</label>
                                        </li>
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" for="flexCheckDefault">Author 1</label>
                                        </li>
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" for="flexCheckDefault">Author 1</label>
                                        </li>
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" for="flexCheckDefault">Author 1</label>
                                        </li>
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" for="flexCheckDefault">Author 1</label>
                                        </li>
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" for="flexCheckDefault">Author 1</label>
                                        </li>
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" for="flexCheckDefault">Author 1</label>
                                        </li>
                                    </ul>
                                </div>
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#publishers" aria-expanded="true" aria-controls="publishers">
                                    <h6><i className="fa-solid fa-book"></i>Εκδόσεις</h6>
                                </button>
                                <div className="filter-data-container collapse show" id="publishers">
                                    <ul className="list-group">
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" for="flexCheckDefault">Publish 1</label>
                                        </li>
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" for="flexCheckDefault">Publish 1</label>
                                        </li>
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" for="flexCheckDefault">Publish 1</label>
                                        </li>
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" for="flexCheckDefault">Publish 1</label>
                                        </li>
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" for="flexCheckDefault">Publish 1</label>
                                        </li>
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" for="flexCheckDefault">Publish 1</label>
                                        </li>
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" for="flexCheckDefault">Publish 1</label>
                                        </li>
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" for="flexCheckDefault">Publish 1</label>
                                        </li>
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" for="flexCheckDefault">Publish 1</label>
                                        </li>
                                        <li>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" for="flexCheckDefault">Publish 1</label>
                                        </li>
                                    </ul>
                                </div>
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#year" aria-expanded="true" aria-controls="year">
                                    <h6><i className="fa-solid fa-calendar"></i>Έτος</h6>
                                </button>
                                <div className="filter-data-container collapse show" id="year">
                                    <input type="range" className="form-range" id="customRange1" style={{ marginTop: "5px" }} />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h5 className="accordion-header" id="headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#categories" aria-expanded="false" aria-controls="collapseOne">
                                <h5><i className="fa-solid fa-tags"></i>Κατηγορίες</h5>
                            </button>
                        </h5>
                        <div id="categories" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <ul className="category-list">
                                    <li className="active">Category1</li>
                                    <li>Category1</li>
                                    <li>Category1</li>
                                    <li>Category1</li>
                                    <li>Category1</li>
                                    <li>Category1</li>
                                    <li>Category1</li>
                                    <li>Category1</li>
                                    <li>Category1</li>
                                    <li>Category1</li>
                                    <li>Category1</li>
                                    <li>Category1</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}