import React from "react";
import "../css/style.css";
import carouselTemp from "../Images/test-image.png";
import BookItems from "./Book/BookItems";

export default function Home() {

    const [selected, setSelected] = React.useState("recommended");

    const changeSelected = (name) => setSelected(name);

    return (
        <div>


            <div id="carouselExampleIndicators" className="carousel slide home-page-carousel" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li key="img1" data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li key="img2" data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li key="img3" data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item carousel-item-container active">
                        <div className="carousel-info">
                            <span>
                            <h3>Η αγαπημένη σας βιβλιοθήκη, τώρα και online!</h3>
                            <br/>
                            <p>
                                Ανακαλύψτε τα αγαπημένα σας βιβλία, πραγματοποιήστε online την κράτηση σας και παραλάβετε άμεσα απ' την βιβλιοθήκη.
                            </p>
                            <p>
                                Με πάνω από 1000 διαφορετικούς τίτλους είναι σίγουρο ότι θα βρείτε κάτι για εσάς.
                            </p>
                            <p>
                                Τόσο ευχάριστα, τόσο γρήγορα, τόσο απλά!
                            </p>

                            </span>
                        </div>    
                        <div className="carousel-img-container" >
                        <img className="carousel-img"  src={require("../Images/carousel-img-1.jpg")} alt="First slide" />
                        </div>
                        
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