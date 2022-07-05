import React from "react";
import "../css/style.css";

export default function Staff() {

    return (

        <div style={{ marginTop: "4rem", width: "50%", marginLeft: "auto", marginRight: "auto" }}>
            <div class="accordion" id="accordionExample">
                <div class="accordion-item" >
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button static-accordion collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            <div className="staff-accordion-button-container">
                                <img className="staff-img-avatar" src={require("../Images/avatar.png")} />
                                <div className="staff-info-container">
                                    <h5>Αντώνιος Κολιαράκης</h5>
                                    <span>Βιβλιοθηκονόμος</span>
                                </div>
                            </div>
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button static-accordion collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <div className="staff-accordion-button-container">
                                <img className="staff-img-avatar" src={require("../Images/avatar.png")} />
                                <div className="staff-info-container">
                                    <h5>Μαρία Καραγιάννη</h5>
                                    <span>Τεχνικό προσωπικό</span>
                                </div>
                            </div>
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            Ο Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button static-accordion collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            <div className="staff-accordion-button-container">
                                <img className="staff-img-avatar" src={require("../Images/avatar.png")} />
                                <div className="staff-info-container">
                                    <h5>Ευτύχης Παναγιός</h5>
                                    <span>Τεχνικό προσωπικό</span>
                                </div>
                            </div>
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingFour">
                        <button class="accordion-button static-accordion collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            <div className="staff-accordion-button-container">
                                <img className="staff-img-avatar" src={require("../Images/avatar.png")} />
                                <div className="staff-info-container">
                                    <h5>Αλέξανδρος Βουρολής</h5>
                                    <span>Βοηθός βιβλιοθήκης</span>
                                </div>
                            </div>
                        </button>
                    </h2>
                    <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingFive">
                        <button class="accordion-button static-accordion collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                            <div className="staff-accordion-button-container">
                                <img className="staff-img-avatar" src={require("../Images/avatar.png")} />
                                <div className="staff-info-container">
                                    <h5>Ουρανία Ξαρχά</h5>
                                    <span>Βοηθός βιβλιοθήκης</span>
                                </div>
                            </div>
                        </button>
                    </h2>
                    <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}