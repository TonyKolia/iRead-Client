import React from "react";
import "../css/style.css";
import logo from "../Images/test-book-img.jpeg";
import carouselTemp from "../Images/test-image.png";
import BookItems from "./BookItems";

export default function Home() {
    return (
        <div>
            <div id="carouselExampleIndicators" className="carousel slide home-page-carousel" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={carouselTemp} alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={carouselTemp} alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={carouselTemp} alt="Third slide" />
                    </div>
                </div>
            </div>

            <div style={{ marginTop: "10px" }}>
                <ul className="nav justify-content-center nav-tabs">
                    <li className="nav-item active">
                        <a className="nav-link home-page-mini-menu active" href="#">Προτεινόμενα</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link home-page-mini-menu" href="#">Νεότερα</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link home-page-mini-menu" href="#">Δημοφιλή</a>
                    </li>
                </ul>
            </div>

            <div style={{ marginTop: "10px" }}>
                <BookItems />
            </div>
        </div>
    );
}