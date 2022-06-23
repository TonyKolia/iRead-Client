import React from "react";
import "../../css/style.css";
import API from "../../Helpers/API";
import Helpers from "../../Helpers/Helpers";
import Loading from "../Loading";
import { useNavigate, useParams } from "react-router-dom";


export default function NewPasswordForm() {

    const [form, setForm] = React.useState({ password: "", confirmPassword: "" });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    let navigate = useNavigate();
    const { userId, token } = useParams();


    function handleChange(e) {
        setForm(prevData => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        });
    }

    const submitPasswords = (e) => {
        e.preventDefault();
        if (form.password === "" || form.confirmPassword === "")
            return setError("Παρακαλούμε συμπληρώστε όλα τα πεδία.");

        if (form.password !== form.confirmPassword)
            return setError("Οι κωδικοί πρόσβασης δεν ταιριάζουν.");

        setLoading(true);
        let url = API.API_URL_POST_RESET_PASSWORD.replace(":userId", userId).replace(":token", token);
        Helpers.performPost(url, form)
            .then(response => {
                setLoading(false);
                if (response.success) {
                    Helpers.successMessage("Η επαναφορά του κωδικού πρόσβασης ολοκληρώθηκε επιτυχώς.");
                    return navigate("/");
                }
                else
                    return response.statusCode == 400 ? Object.keys(response.data.errors).forEach(key => setError(response.data.errors[key])) : navigate("/error");
            });
    }

    return (
        <>
            {loading && <Loading />}
            <h3 className="form-header" style={{ paddingTop: "3rem" }}><i className="fa-solid fa-user-lock"></i>Επαναφορά κωδικού πρόσβασης</h3>
            <h6 className="form-header" style={{ paddingTop: "1rem" }}>Παρακαλούμε εισάγετε το νέο κωδικό πρόσβασης του λογαριασμού σας. </h6>
            <div className="password-reset-container">
                <form className="register-form-tab" name="password-reset-email">
                    <div className="form-control-container">
                        <i className="fa-solid fa-lock" title={form.password != "" ? "Κωδικός πρόσβασης" : ""}></i>
                        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Κωδικός πρόσβασης" />
                    </div>
                    <div className="form-control-container">
                        <i className="fa-solid fa-lock" title={form.confirmPassword != "" ? "Επιβεβαίωση κωδικού πρόσβασης" : ""}></i>
                        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Επιβεβαίωση κωδικού πρόσβασης" />
                    </div>
                    {error !== "" && <div className="alert alert-danger">
                        <div><i class="fa-solid fa-circle-exclamation"></i>{error}</div>
                    </div>}
                    <div style={{ display: "flex", justifyContent: "center", paddingTop: "1rem" }}>
                        <button onClick={submitPasswords} className="btn btn-primary btn-custom"><i className="fa-solid fa-check"></i>Αποστολή</button>
                    </div>
                </form>
            </div>
        </>
    );

}