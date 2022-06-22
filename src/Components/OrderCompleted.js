import React from "react";
import "../css/style.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export default function OrderCompleted() {

    
    const {state} = useLocation();
    const navigate = useNavigate();

    console.log(state);

    React.useEffect(() => {
        if(!state){
            return navigate("/");
        }
    },[]);
    
    const { id } = useParams();

    return (
        <div className="order-completed-container">
            <i className="fa-solid fa-circle-check fa-10x order-success"></i>
            <h3 style={{paddingTop:"15px"}}>Η κράτηση σας ολοκληρώθηκε με επιτυχία!</h3>
            <h4 style={{paddingTop:"15px"}} >Κωδικός κράτησης: #{id}</h4>
            <h6 style={{paddingTop:"15px", textAlign: "center"}}>Έχει σταλεί email επιβεβαίωσης της κράτησης στην διεύθυνση ηλεκτρονικού ταχυδρομίου που έχετε δηλώσει.</h6>
            <h6 style={{paddingTop:"15px", textAlign: "center"}}>Μπορείτε να παραλάβετε τα βιβλία απ' τη βιβλιοθήκη με τον κωδικό κράτησης και την ταυτότητα σας.</h6>
            <div style={{paddingTop:"15px"}}>
                <button type="button" onClick={() => navigate("/")} className="btn btn-primary btn-custom"><i className="fa-solid fa-arrow-left"></i>Επιστροφή</button>
            </div>

        </div>
    );

}