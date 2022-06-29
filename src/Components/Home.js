import React from "react";
import "../css/style.css";
import { useNavigate } from "react-router-dom";
import HomeBookItems from "./Book/HomeBookItems";
import { Carousel } from "bootstrap";

export default function Home() {

    const [selected, setSelected] = React.useState("recommended");
    let navigate = useNavigate();
    const changeSelected = (name) => setSelected(name);

    React.useEffect(() => {

        //let carouselElement = document.getElementById("carouselExampleIndicators");
        //let carousel = new Carousel(carouselElement, { interval: 3000, wrap: true});
        //carousel.cycle();

    }, []);

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
                        <a href="/register"><img className="home-carousel-img" src={require("../Images/carousel1.png")} /></a>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <a href="#"><img className="home-carousel-img" src={require("../Images/carousel2.png")} /></a>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <a href="#"><img className="home-carousel-img" src={require("../Images/carousel3.png")} /></a>
                    </div>
                </div>
            </div>

            <HomeBookItems />
        </div>
    );
}