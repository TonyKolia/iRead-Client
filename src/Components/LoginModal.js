import React from "react";
import "../css/style.css";

export default function LoginModal() {

    return (
        <div className="modal" tabIndex="-1" id="loginModal" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content login-modal">
                    <div style={{ width: "100%" }}>
                        <div className="modal-header">
                            <div className="avatar">
                                <img src={require("../Images/avatar.png")} />
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{ paddingLeft: "50px", paddingRight: "50px" }}>
                            <h5 className="login-head">Σύνδεση στον λογαριασμό σου</h5>
                            <form>
                                <div className="form-control-container">
                                    <i className="fa-solid fa-user"></i>
                                    <input type="text" placeholder="Όνομα χρήστη" />
                                </div>
                                <div className="form-control-container">
                                    <i className="fa-solid fa-lock"></i>
                                    <input type="password" placeholder="Κωδικός πρόσβασης" />
                                </div>
                                <div style={{ marginBottom: "10px", textAlign: "right" }}>
                                    <a className="register-link" href="#">Ξέχασες τον κωδικό;</a>
                                </div>
                                <button type="submit" className="btn btn-primary btn-custom" style={{ width: "100%" }}><i className="fa-solid fa-right-to-bracket"></i>Σύνδεση</button>
                            </form>
                            <div style={{ textAlign: "center", paddingTop: "20px" }}>
                                <small>Δεν έχεις λογαριασμό; </small><a className="register-link" href="#">Γίνε μέλος τώρα!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}