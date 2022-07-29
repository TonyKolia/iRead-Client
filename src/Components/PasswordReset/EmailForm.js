import React from "react";
import "../../css/style.css";
import Helpers from "../../Helpers/Helpers";
import API from "../../Helpers/API";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { UserContext } from "../../App";

export default function EmailForm() {

    const [loading, setLoading] = React.useState(false);
    const [emailSent, setEmailSent] = React.useState(false);
    const [error, setError] = React.useState("");
    const user = React.useContext(UserContext);
    let navigate = useNavigate();

    const [email, setEmail] = React.useState("");

    const submitEmail = (e) => {
        e.preventDefault();

        if(user !== null && user !== undefined && user.user.userId !== "")
            return setError("Η επαναφορά κωδικού πρόσβασης δεν είναι δυνατή διότι υπάρχει ήδη συνδεδεμένος χρήστης. Παρακαλώ αποσυνδεθείτε για να συνεχίσετε.")

        if (email === "" || email === null)
            return;

        setLoading(true);
        let url = API.API_URL_POST_SEND_RESET_PASSWORD_EMAIL.replace(":email", email);
        Helpers.performPost(url)
            .then(response => {
                setLoading(false);
                if (response.success)
                    return setEmailSent(true);
                else
                    return response.statusCode == 400 ? Object.keys(response.data.errors).forEach(key => setError(response.data.errors[key])) : navigate("/error");
            });

    }


    return (
        <>
            {loading && <Loading />}
            <h3 className="form-header" style={{ paddingTop: "3rem" }}><i className="fa-solid fa-user-lock"></i>Επαναφορά κωδικού πρόσβασης</h3>
            {
                !emailSent &&
                <>
                    <h6 className="form-header" style={{ paddingTop: "1rem" }}>Παρακαλούμε εισάγετε την διεύθυνση email του λογαριασμού σας.<br /> Στη συνέχεια θα σας αποσταλεί email με οδηγίες για την επαναφορά του κωδικού πρόσβασης του λογαριασμού σας. </h6>
                    <div className="password-reset-container">
                        <form className="register-form-tab" name="password-reset-email">
                            <div className="form-control-container" >
                                <i className="fa-solid fa-at" title={email !== "" ? "Διεύθυνση email" : ""}></i>
                                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Διεύθυνση email" />
                            </div>
                            {error !== "" && <div className="alert alert-danger">
                                <div><i class="fa-solid fa-circle-exclamation"></i>{error}</div>
                            </div>}
                            <div style={{ display: "flex", justifyContent: "center", paddingTop: "1rem" }}>
                                <button onClick={submitEmail} className="btn btn-primary btn-custom"><i className="fa-solid fa-check"></i>Αποστολή</button>
                            </div>
                        </form>
                    </div>
                </>
            }
            {
                emailSent && 
                <>
                    <h6 className="form-header" style={{ paddingTop: "1rem" }}>Έχει σταλεί email με οδηγίες για την επαναφορά του κωδικού πρόσβασης του λογαριασμού σας στην διεύθυνση {email}</h6>
                    <div style={{ display: "flex", justifyContent: "center", paddingTop: "1rem" }}>
                                <button onClick={() => navigate("/")} className="btn btn-primary btn-custom"><i className="fa-solid fa-arrow-left"></i>Επιστροφή</button>
                    </div>
                </>
            }

        </>


    );

}