import React from "react";
import "../css/style.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export default function OrderCompleted(props) {

    
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
            <h3 style={{paddingTop:"15px"}}>Η κράτηση σου ολοκληρώθηκε με επιτυχία!</h3>
            <h4 style={{paddingTop:"15px"}} >Κωδικός κράτησης: #{id}</h4>
            <h6 style={{paddingTop:"15px", textAlign: "center"}}>Μπορείς να παραλάβεις τα βιβλία σου απ' τη βιβλιοθήκη με τον κωδικό κράτησης και την ταυτότητα σου.</h6>
            <div style={{paddingTop:"15px"}}>
                <button type="button" onClick={() => navigate("/")} className="btn btn-primary btn-custom"><i className="fa-solid fa-arrow-left"></i>Επιστροφή</button>
                <button type="button" className="btn btn-primary btn-custom"><i className="fa-solid fa-print"></i>Εκτύπωση</button>
            </div>

        </div>
    );

}