import React from "react";
import "../css/style.css";
import carouselTemp from "../Images/test-image.png";
import BookItems from "./Book/BookItems";
import { useNavigate } from "react-router-dom";

export default function Home() {

    const [selected, setSelected] = React.useState("recommended");
    let navigate = useNavigate();
    const changeSelected = (name) => setSelected(name);

    return (
        <div>

            <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="3000">
                        <button onClick={() => navigate("/register")} className="btn btn-primary btn-custom btn-carousel"><i className="fa-solid fa-user-plus"></i>Εγγραφή</button>
                        <img src={require("../Images/carousel1.png")} />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <button className="btn btn-primary btn-custom btn-carousel"><i className="fa-solid fa-info-circle"></i>Μάθετε περισσότερα</button>
                        <img src={require("../Images/carousel2.png")} />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <button className="btn btn-primary btn-custom btn-carousel"><i className="fa-solid fa-info-circle"></i>Μάθετε περισσότερα</button>
                        <img src={require("../Images/carousel3.png")} />
                    </div>
                </div>
            </div>

            <div style={{ marginTop: "10px" }}>
                <ul className="nav justify-content-center mini-menu">
                    <li onClick={() => changeSelected("recommended")} key="recommended" className={`mini-menu-item fromLeft ${selected == "recommended" ? "selected" : ""}`}>Προτεινόμενα</li>
                    <li onClick={() => changeSelected("new")} key="new" className={`mini-menu-item fromLeft ${selected == "new" ? "selected" : ""}`}>Νεότερα</li>
                    <li onClick={() => changeSelected("hot")} key="hot" className={`mini-menu-item fromLeft ${selected == "hot" ? "selected" : ""}`}>Δημοφιλή</li>
                </ul>
            </div>

            <div style={{ marginTop: "10px" }}>
                <BookItems />
            </div>
        </div>
    );
}