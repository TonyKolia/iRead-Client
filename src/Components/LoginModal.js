import React from "react";
import "../css/style.css";
import API from "../Helpers/API";
import Helpers from "../Helpers/Helpers";

export default function LoginModal(props) {

    const [loginForm, setLoginForm] = React.useState({ username: "", password: "" });
    const [loginStatus, setLoginStatus] = React.useState({failed: null, message: ""});

    async function submitLoginForm(e) {
        e.preventDefault();
        let response = await Helpers.performPost(API.API_URL_LOGIN, loginForm);
        if (!response.success) {
            setLoginStatus({failed: true, message: response.message});
        }
        else{
            props.loginUser(response.data);
            var closeButton = document.getElementById("closeModal");
            if(closeButton)
                closeButton.click();
        }
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
                            <h5 className="login-head">Σύνδεση στον λογαριασμό σου</h5>
                            <form>
                                <div className="form-control-container">
                                    <i className="fa-solid fa-user"></i>
                                    <input type="text" onChange={handleChange} name="username" placeholder="Όνομα χρήστη" />
                                </div>
                                <div className="form-control-container">
                                    <i className="fa-solid fa-lock"></i>
                                    <input type="password" onChange={handleChange} name="password" placeholder="Κωδικός πρόσβασης" />
                                </div>
                                <div style={{ marginBottom: "10px", textAlign: "right" }}>
                                    <a className="register-link" href="#">Ξέχασες τον κωδικό;</a>
                                </div>
                                {loginStatus.failed && <div className="alert alert-danger" role="alert">
                                    {loginStatus.message}
                                </div>}
                                <button onClick={submitLoginForm} className="btn btn-primary btn-custom" style={{ width: "100%" }}><i className="fa-solid fa-right-to-bracket"></i>Σύνδεση</button>
                            </form>
                            <div style={{ textAlign: "center", paddingTop: "20px" }}>
                                <small>Δεν έχεις λογαριασμό; </small><a className="register-link" href="/register">Γίνε μέλος τώρα!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}