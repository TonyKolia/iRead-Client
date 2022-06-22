import React from "react";
import "../css/style.css";
import API from "../Helpers/API";
import Helpers from "../Helpers/Helpers";
import { UserContext, USER_ACTIONS } from "../App";
import Loading from "./Loading";

export default function LoginModal() {

    const user = React.useContext(UserContext);
    const [loginForm, setLoginForm] = React.useState({ username: "", password: "" });
    const [loginStatus, setLoginStatus] = React.useState({ failed: null, message: "" });
    const [loading, setLoading] = React.useState(false);

    const checkForUserNotifications = (userId, token) => {

        setLoading(true);
        let url = API.API_URL_GET_NOT_VIEWED_NOTIFICATIONS_COUNT.replace(":userId", userId);
        Helpers.performGet(url, token)
            .then(response => {
                setLoading(false);
                if (response.success && response.data > 0)
                    return Helpers.infoMessage(`Έχετε ${response.data} ${response.data == 1 ? "νέα ειδοποίηση" : "νέες ειδοποίησεις"}.`);
            });

    }

    function submitLoginForm(e) {
        e.preventDefault();
        setLoading(true);
        Helpers.performPost(API.API_URL_LOGIN, loginForm)
            .then(response => {
                setLoading(false);
                if (!response.success) {
                    return setLoginStatus({ failed: true, message: response.message });
                }
                else {
                    user.dispatchUser({ type: USER_ACTIONS.LOGIN, payload: { user: response.data } })
                    var closeButton = document.getElementById("closeModal");
                    if (closeButton)
                        closeButton.click();
                    checkForUserNotifications(response.data.userId, response.data.token);
                    setLoginStatus({ failed: null, message: "" });
                    return setLoginForm({ username: "", password: "" });
                }
            });
    }

    function handleChange(e) {
        setLoginForm(prevData => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <>
            {loading && <Loading />}
            <div className="modal" tabIndex="-1" id="loginModal" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content login-modal">
                        <div style={{ width: "100%" }}>
                            <div className="modal-header">
                                <div className="avatar">
                                    <img src={require("../Images/avatar.png")} />
                                </div>
                                <button type="button" id="closeModal" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body" style={{ paddingLeft: "50px", paddingRight: "50px" }}>
                                <h5 className="login-head">Σύνδεση στον λογαριασμό σας</h5>
                                <form>
                                    <div className="form-control-container">
                                        <i className="fa-solid fa-user"></i>
                                        <input type="text" onChange={handleChange} value={loginForm.username} name="username" placeholder="Όνομα χρήστη" />
                                    </div>
                                    <div className="form-control-container">
                                        <i className="fa-solid fa-lock"></i>
                                        <input type="password" onChange={handleChange} value={loginForm.password} name="password" placeholder="Κωδικός πρόσβασης" />
                                    </div>
                                    <div style={{ marginBottom: "10px", textAlign: "right" }}>
                                        <a className="register-link" href="#">Ξεχάσατε τον κωδικό;</a>
                                    </div>
                                    {loginStatus.failed && <div className="alert alert-danger" role="alert">
                                        {loginStatus.message}
                                    </div>}
                                    <button onClick={submitLoginForm} className="btn btn-primary btn-custom" style={{ width: "100%" }}><i className="fa-solid fa-right-to-bracket"></i>Σύνδεση</button>
                                </form>
                                <div style={{ textAlign: "center", paddingTop: "20px" }}>
                                    <small>Δεν έχετε λογαριασμό; </small><a className="register-link" href="/register">Γίνετε μέλος τώρα!</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );

}