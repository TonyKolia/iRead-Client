import React from "react";
import "../css/style.css";
import { useNavigate } from "react-router-dom";

export default function NotFound(){

    let navigate = useNavigate();

    return(
        <div className="error-page-container">
            <i class="fa-solid fa-ghost fa-10x"></i>
            <h4>Χμμμμ...δυστυχώς δεν μπορέσαμε να βρούμε τη σελίδα που ψάχνετε.</h4>
            <button onClick={() => navigate("/")} type="button" className="btn btn-primary btn-custom"><i className="fa-solid fa-arrow-left"></i>Επιστροφή</button>
        </div>
    );
}