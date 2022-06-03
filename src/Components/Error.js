import React from "react";
import "../css/style.css";
import { useNavigate } from "react-router-dom";

export default function Error(){

    let navigate = useNavigate();

    return(
        <div className="error-page-container">
            <i class="fa-solid fa-face-frown fa-10x"></i>
            <h4>Ούπς!</h4>
            <h5>Απ' ότι φαίνεται, κάτι πήγε στραβά. Λυπούμαστε γι' αυτό!</h5>
            <h6>Αν το πρόβλημα συνεχίσει να εμφανίζεται, παρακαλούμε επικοινωνήστε μαζί μας στην παρακάτω διέυθυνση email.</h6>
            <h6 style={{paddingBottom: "15px"}}>tech-support@iread.gr</h6>
            <button onClick={() => navigate("/")} type="button" className="btn btn-primary btn-custom"><i className="fa-solid fa-arrow-left"></i>Επιστροφή</button>
        </div>
    );
}