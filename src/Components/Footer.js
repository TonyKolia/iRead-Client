import React from "react";
import "../css/style.css";

export default function Footer(){

    return (
        <footer className="sticky-footer">
            <hr/>
                <div style={{width:"100%", display: "flex", justifyContent: "center"}}>
                    <div className="footer-column">
                        <h5>Επικοινωνία</h5>
                        <ul style= {{listStyle: "none"}}>
                            <li>
                                <span><i className="fa-solid fa-location-pin"></i>Αγίου Σπυρίδωνος 28, Αιγάλεω 122 43</span>
                            </li>
                            <li>
                                <span><i className="fa-solid fa-phone"></i>210-5381100</span>
                            </li>
                            <li>
                                <span><i className="fa-solid fa-envelope"></i>testemail@uniwa.gr</span>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h5>Χρήσιμοι σύνδεσμοι</h5>
                        <ul style={{listStyle: "none"}}>
                            <li>
                                <span><a href="https://twitter.com/iceuniwa">Όροι χρήσης</a></span>
                            </li>
                            <li>
                                <span><a href="https://twitter.com/iceuniwa">Συχνές ερωτήσεις</a></span>
                            </li>
                            <li>
                                <span><a href="https://twitter.com/iceuniwa">Πολιτική απορρήτου</a></span>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h5>Ακολουθήστε μας</h5>
                        <ul style={{listStyle:"none", paddingBottom:"8px"}}>
                            <li>
                                <div>
                                    <span><a href="https://www.facebook.com/UniversityofWestAttica/"><i className="fa-brands fa-facebook-f social-media-icon" style={{paddingLeft: "0px"}}></i></a></span>
                                    <span><a href="https://twitter.com/iceuniwa"><i className="fa-brands fa-twitter social-media-icon"></i></a></span>
                                    <span><a href="https://www.instagram.com/universityofwestattica"><i className="fa-brands fa-instagram social-media-icon"></i></a></span>
                                    <span><a href="#"><i className="fa-brands fa-youtube social-media-icon"></i></a></span>
                                    <span><a href="#"><i className="fa-brands fa-google-plus-g social-media-icon" style={{paddingRight: "0px"}}></i></a></span>
                                </div>
                            </li>
                        </ul>
                        <small>Copyright ©2022 | Designed by Antonis Koliarakis</small>
                    </div>
                </div>
        </footer>
    )
}