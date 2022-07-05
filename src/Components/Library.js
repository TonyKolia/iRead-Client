import React from "react";
import "../css/style.css";

export default function Library() {


    return (
        <div style={{ marginTop: "4rem", width: "70%", marginLeft: "auto", marginRight: "auto" }}>
            <ul className="list-group-flush">
                <li className="list-group-item">
                    <div className="library-item-container">
                        <img className="library-img" src={require("../Images/library1.jpg")} />
                        <span style={{textAlign: "justify", paddingLeft: "1rem", paddingRight: "1rem"}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <br />Excepteur sint occaecat cupidatat aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </span>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="library-item-container">
                        <span style={{textAlign: "justify", paddingRight: "2rem"}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <br />Excepteur sint occaecat cupidatat aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </span>
                        <img className="library-img" src={require("../Images/library2.jpg")} />
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="library-item-container">
                        <img className="library-img" src={require("../Images/library3.jpg")} />
                        <span style={{textAlign: "justify", paddingLeft: "1rem", paddingRight: "1rem"}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <br />Excepteur sint occaecat cupidatat aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </span>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="library-item-container">
                        <span style={{textAlign: "justify", paddingRight: "2rem"}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <br />Excepteur sint occaecat cupidatat aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </span>
                        <img className="library-img" src={require("../Images/library4.jpg")} />
                    </div>
                </li>
            </ul>
        </div>);

}