import React from "react";
import "../css/style.css";
import API from "../Helpers/API";
import Helpers from "../Helpers/Helpers";
import { useNavigate } from "react-router-dom";
import FieldError from "./FieldError";

export default function Register(props) {

    const [idTypes, setIdTypes] = React.useState([]);
    const [genders, setGenders] = React.useState([]);
    const [errors, setErrors] = React.useState({});
    const [emptyFields, setEmptyFields] = React.useState([]);
    const myRef = React.useRef(null);


    let navigate = useNavigate();
    const [registerForm, setRegisterForm] = React.useState({
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        surname: "",
        birthdate: null,
        gender: null,
        idType: null,
        idNumber: "",
        address: "",
        country: "",
        city: "",
        postalCode: "",
        telephone: "",
        email: "",
        acceptTerms: false,
        newsletter: false
    });

    React.useEffect(() => {
        fetch(API.API_URL_GET_GENDERS).then(res => res.json()).then(res => setGenders(res.data))
        fetch(API.API_URL_GET_ID_TYPES).then(res => res.json()).then(res => setIdTypes(res.data))
    }, []);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setRegisterForm(prevData => {
            return {
                ...prevData,
                [name]: type === "checkbox" ? checked : value
            }
        });
    }

    function submitRegisterForm(e) {
        e.preventDefault();

        Helpers.performPost(API.API_URL_REGISTER, registerForm)
        .then(response => {
            if(!response.success)
            {
                if(response.statusCode == 500 || !response.data)
                    return navigate("/error");

                if(response.data.validationFailType == 0){
                    setErrors({});
                    return setEmptyFields(response.data.emptyFields);
                }

                if(response.data.validationFailType == 1){
                    setEmptyFields([]);
                    return setErrors(response.data.errors);
                }
            }
            else{
                Helpers.performPost(API.API_URL_LOGIN, {username: registerForm.username, password: registerForm.password})
                .then(response => props.loginUser(response.data));

                return navigate("/");
            }
        });
    }

    return (
        <div className="register-container">
            <h3 className="form-header" style={{ paddingTop: "3rem" }}><i className="fa-solid fa-user-plus"></i>Δημιουργία λογαριασμού</h3>
            <form name="register-form">
                <h4 className="form-header">Στοιχεία λογαριασμού</h4>
                <div className="collapse show" id="account-info">
                    <div className={"form-control-container"}>
                        <i className="fa-solid fa-user" title={registerForm.username != "" ? "Όνομα χρήστη" : ""}></i>
                        <input type="text" name="username" value={registerForm.username} onChange={handleChange} placeholder="Όνομα χρήστη" />
                        {emptyFields.includes("username") && <i class="fa-solid fa-star-of-life"></i>}
                    </div>
                    {errors.username && <FieldError error={errors.username} />}
                    <div className="form-control-container">
                        <i className="fa-solid fa-lock" title={registerForm.password != "" ? "Κωδικός πρόσβασης" : ""}></i>
                        <input type="password" name="password" value={registerForm.password} onChange={handleChange} placeholder="Κωδικός πρόσβασης" />
                        {emptyFields.includes("password") && <i class="fa-solid fa-star-of-life"></i>}
                    </div>
                    <div className="form-control-container">
                        <i className="fa-solid fa-lock" title={registerForm.confirmPassword != "" ? "Επιβεβαίωση κωδικού πρόσβασης" : ""}></i>
                        <input type="password" name="confirmPassword" value={registerForm.confirmPassword} onChange={handleChange} placeholder="Επιβεβαίωση κωδικού πρόσβασης" />
                        {emptyFields.includes("confirmPassword") && <i class="fa-solid fa-star-of-life"></i>}
                    </div>
                    {errors.confirmPassword && <FieldError error={errors.confirmPassword} />}
                    <hr />
                </div>
                <h4 className="form-header">Προσωπικά στοιχεία</h4>
                <div className="collapse show" id="personal-info">
                    <div className="form-control-container">
                        <i className="fa-solid fa-user" title={registerForm.name != "" ? "Όνομα" : ""}></i>
                        <input type="text" name="name" value={registerForm.name} onChange={handleChange} placeholder="Όνομα" />
                        {emptyFields.includes("name") && <i class="fa-solid fa-star-of-life"></i>}
                    </div>
                    <div className="form-control-container">
                        <i className="fa-solid fa-user" title={registerForm.surname != "" ? "Επώνυμο" : ""}></i>
                        <input type="text" name="surname" value={registerForm.surname} onChange={handleChange} placeholder="Επώνυμο" />
                        {emptyFields.includes("surname") && <i class="fa-solid fa-star-of-life"></i>}
                    </div>
                    <div className="form-control-container">
                        <i className="fa-solid fa-calendar" title={registerForm.birthdate != null ? "Ημερομηνία γέννησης" : ""}></i>
                        <input type="text" name="birthdate" onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => (e.target.type = 'text')} onChange={handleChange} placeholder="Ημερομηνία γέννησης" />
                        {emptyFields.includes("birthdate") && <i class="fa-solid fa-star-of-life"></i>}
                    </div>
                    {errors.birthdate && <FieldError error={errors.birthdate} />}
                    <div className="form-control-container">
                        <i className="fa-solid fa-mars-and-venus" title={registerForm.gender != null ? "Φύλο" : ""}></i>
                        <select name="gender" onChange={handleChange} value={registerForm.gender}>
                            <option value="" readOnly={true} hidden>Φύλο</option>
                            {genders.map(gender => <option key={gender.id} value={gender.id}>{gender.description}</option>)}
                        </select>
                        {emptyFields.includes("gender") && <i class="fa-solid fa-star-of-life"></i>}
                    </div>
                    <div className="form-control-container">
                        <i className="fa-solid fa-id-card" title={registerForm.idType != null ? "Έγγραφο ταυτοποίησης" : ""}></i>
                        <select name="idType" onChange={handleChange} value={registerForm.idType}>
                            <option value="" readOnly={true} hidden>Έγγραφο ταυτοποίησης</option>
                            {idTypes.map(idType => <option key={idType.id} value={idType.id}>{idType.description}</option>)}
                        </select>
                        {emptyFields.includes("idType") && <i class="fa-solid fa-star-of-life"></i>}
                    </div>
                    <div className="form-control-container">
                        <i className="fa-solid fa-id-card" title={registerForm.idNumber != "" ? "Αριθμός εγγραφού ταυτοποίησης" : ""}></i>
                        <input type="text" name="idNumber" value={registerForm.idNumber} onChange={handleChange} placeholder="Αριθμός εγγραφού ταυτοποίησης" />
                        {emptyFields.includes("idNumber") && <i class="fa-solid fa-star-of-life"></i>}
                    </div>
                    {errors.idNumber && <FieldError error={errors.idNumber} />}
                    <hr />
                </div>
                <h4 className="form-header">Στοιχεία επικοινωνίας</h4>
                <div className="collapse show" id="contact-info">
                    <div className="form-control-container">
                        <i className="fa-solid fa-location-dot" title={registerForm.address != "" ? "Διεύθυνση κατοικίας" : ""}></i>
                        <input type="text" name="address" value={registerForm.address} onChange={handleChange} placeholder="Διεύθυνση κατοικίας" />
                        {emptyFields.includes("address") && <i class="fa-solid fa-star-of-life"></i>}
                    </div>
                    <div className="form-control-container">
                        <i className="fa-solid fa-flag" title={registerForm.country != "" ? "Χώρα" : ""}></i>
                        <input type="text" name="country" value={registerForm.country} onChange={handleChange} placeholder="Χώρα" />
                        {emptyFields.includes("country") && <i class="fa-solid fa-star-of-life"></i>}
                    </div>
                    <div className="form-control-container">
                        <i className="fa-solid fa-city" title={registerForm.city != "" ? "Πόλη" : ""}></i>
                        <input type="text" name="city" value={registerForm.city} onChange={handleChange} placeholder="Πόλη" />
                        {emptyFields.includes("city") && <i class="fa-solid fa-star-of-life"></i>}
                    </div>
                    <div className="form-control-container">
                        <i className="fa-solid fa-envelope" title={registerForm.postalCode != "" ? "Ταχυδρομικός κώδικας" : ""}></i>
                        <input type="text" name="postalCode" value={registerForm.postalCode} onChange={handleChange} placeholder="Ταχυδρομικός κώδικας" />
                        {emptyFields.includes("postalCode") && <i class="fa-solid fa-star-of-life"></i>}
                    </div>
                    {errors.postalCode && <FieldError error={errors.postalCode} />}
                    <div className="form-control-container">
                        <i className="fa-solid fa-at" title={registerForm.email != "" ? "Διεύθυνση email" : ""}></i>
                        <input type="text" name="email" value={registerForm.email} onChange={handleChange} placeholder="Διεύθυνση email" />
                        {emptyFields.includes("email") && <i class="fa-solid fa-star-of-life"></i>}
                    </div>
                    {errors.email && <FieldError error={errors.email} />}
                    <div className="form-control-container">
                        <i className="fa-solid fa-phone" title={registerForm.telephone != "" ? "Τηλέφωνο" : ""}></i>
                        <input type="text" name="telephone" value={registerForm.telephone} onChange={handleChange} placeholder="Τηλέφωνο" />
                        {emptyFields.includes("telephone") && <i class="fa-solid fa-star-of-life"></i>}
                    </div>
                    {errors.telephone && <FieldError error={errors.telephone} />}
                    <hr />
                </div>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div className="form-check">
                        <input className="form-check-input" name="acceptTerms" checked={registerForm.acceptTerms} onChange={handleChange} type="checkbox" id="acceptTerms" />
                        <label className="form-check-label" htmlFor="acceptTerms">Αποδέχομαι τους όρους χρήσης</label>
                        {emptyFields.includes("acceptTerms") && <i class="fa-solid fa-star-of-life"></i>}
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" name="newsletter" checked={registerForm.newsletter} onChange={handleChange} type="checkbox" id="newsletter" />
                        <label className="form-check-label" htmlFor="newsletter">Εγγραφή στο newsletter</label>
                    </div>
                </div>
                {emptyFields.length > 0 && <div style={{ marginTop: "15px" }} className="alert alert-danger" role="alert">Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία.</div>}
                <div style={{ display: "flex", justifyContent: "center", paddingTop: "1rem" }}>
                    <button onClick={submitRegisterForm} className="btn btn-primary btn-custom"><i className="fa-solid fa-check"></i>Δημιουργία</button>
                </div>
            </form>
        </div>
    );

}



