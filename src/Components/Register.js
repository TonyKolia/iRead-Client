import React from "react";
import "../css/style.css";
import API from "../Helpers/API"; 

export default function Register() {

    const [idTypes, setIdTypes] = React.useState([]);
    const [genders, setGenders] = React.useState([]);
    const [errors, setErrors] = React.useState([]);

    const [registerForm, setRegisterForm] = React.useState({
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        surname: "",
        birthdate: "",
        gender: "",
        idType: "",
        idNumber: "",
        address: "",
        counrty: "",
        city: "",
        postalCode: "",
        telephone: "",
        email: "",
        acceptTerms: false,
        newsletter: false
    })

    console.log(registerForm.birthdate);

    React.useEffect(() => {
        fetch(API.API_URL_GET_GENDERS).then(res => res.json()).then(res => setGenders(res.data))
        fetch(API.API_URL_GET_ID_TYPES).then(res => res.json()).then(res => setIdTypes(res.data))
    },[]);

    function handleChange(e){
        const {name, value, type, checked} = e.target;
        setRegisterForm(prevData => {
            return {
                ...prevData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function submitRegisterForm(e){
        e.preventDefault();
        var errors = validateRegisterForm(registerForm);
        if(errors.length > 0){
            setErrors(errors);
            console.log(errors);
            return;
        }
    }

    return (
        <div className="register-container">
            <h3 className="form-header" style={{ paddingTop: "3rem" }}><i className="fa-solid fa-user-plus"></i>Δημιουργία λογαριασμού</h3>
            <form name="register-form">
                <h4 className="form-header">Στοιχεία λογαριασμού</h4>
                <div className="collapse show" id="account-info">
                    <div className="form-control-container">
                        <i className="fa-solid fa-user"></i>
                        <input type="text" name="username" value={registerForm.username} onChange={handleChange} placeholder="Όνομα χρήστη" />
                    </div>
                    <div className="form-control-container">
                        <i className="fa-solid fa-lock"></i>
                        <input type="password" name="password" value={registerForm.password} onChange={handleChange} placeholder="Κωδικός πρόσβασης" />
                    </div>
                    <div className="form-control-container">
                        <i className="fa-solid fa-lock"></i>
                        <input type="password" name="confirmPassword" value={registerForm.confirmPassword} onChange={handleChange} placeholder="Επιβεβαίωση κωδικού πρόσβασης" />
                    </div>
                    <hr />
                </div>
                <h4 className="form-header">Προσωπικά στοιχεία</h4>
                <div className="collapse show" id="personal-info">
                    <div className="form-control-container">
                        <i className="fa-solid fa-user"></i>
                        <input type="text" name="name" value={registerForm.name} onChange={handleChange} placeholder="Όνομα" />
                    </div>
                    <div className="form-control-container">
                        <i className="fa-solid fa-user"></i>
                        <input type="text" name="surname" value={registerForm.surname} onChange={handleChange} placeholder="Επώνυμο" />
                    </div>
                    <div className="form-control-container">
                        <i className="fa-solid fa-calendar"></i>
                        <input type="text" name="birthdate" onFocus={(e) => (e.target.type='date')} onBlur={(e) => (e.target.type='text')} onChange={handleChange} placeholder="Ημερομηνία γέννησης" />
                    </div>
                    <div className="form-control-container">
                        <i className="fa-solid fa-mars-and-venus"></i>
                        <select name="gender" onChange={handleChange} value={registerForm.gender}>
                            <option value="" readOnly={true} hidden>Φύλο</option>
                            {genders.map(gender => <option key={gender.id}>{gender.description}</option>)}
                        </select>
                    </div>
                    <div className="form-control-container">
                        <i className="fa-solid fa-id-card"></i>
                        <select name="idType" onChange={handleChange} value={registerForm.idType}>
                            <option value="" readOnly={true} hidden>Έγγραφο ταυτοποίησης</option>
                            {idTypes.map(idType => <option key={idType.id}>{idType.description}</option>)}
                        </select>
                    </div>
                    <div className="form-control-container">
                        <i className="fa-solid fa-id-card"></i>
                        <input type="text" name="idNumber" value={registerForm.idNumber} onChange={handleChange} placeholder="Αριθμός εγγραφού ταυτοποίησης" />
                    </div>
                    <hr />
                </div>
                <h4 className="form-header">Στοιχεία επικοινωνίας</h4>
                <div className="collapse show" id="contact-info">
                    <div className="form-control-container">
                        <i className="fa-solid fa-location-dot"></i>
                        <input type="text" name="address" value={registerForm.address} onChange={handleChange} placeholder="Διεύθυνση κατοικίας" />
                    </div>
                    <div className="form-control-container">
                        <i className="fa-solid fa-flag"></i>
                        <input type="text" name="country" value={registerForm.country} onChange={handleChange} placeholder="Χώρα" />
                    </div>
                    <div className="form-control-container">
                        <i className="fa-solid fa-city"></i>
                        <input type="text" name="city" value={registerForm.city} onChange={handleChange} placeholder="Πόλη" />
                    </div>
                    <div className="form-control-container">
                        <i className="fa-solid fa-envelope"></i>
                        <input type="text" name="postalCode" value={registerForm.postalCode} onChange={handleChange} placeholder="Ταχυδρομικός κώδικας" />
                    </div>
                    <div className="form-control-container">
                        <i className="fa-solid fa-at"></i>
                        <input type="text" name="email" value={registerForm.email} onChange={handleChange} placeholder="Διεύθυνση email" />
                    </div>
                    <div className="form-control-container">
                        <i className="fa-solid fa-phone"></i>
                        <input type="text" name="telephone" value={registerForm.telephone} onChange={handleChange} placeholder="Τηλέφωνο" />
                    </div>
                    <hr />
                </div>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div className="form-check">
                        <input className="form-check-input" name="acceptTerms" checked={registerForm.acceptTerms} onChange={handleChange} type="checkbox" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">Αποδέχομαι τους όρους χρήσης</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" name="newsletter" checked={registerForm.newsletter} onChange={handleChange} type="checkbox" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">Εγγραφή στο newsletter</label>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", paddingTop: "1rem" }}>
                    <button onClick={submitRegisterForm} className="btn btn-primary btn-custom"><i className="fa-solid fa-check"></i>Δημιουργία</button>
                </div>
            </form>
        </div>
    );

}

function validateRegisterForm(form){
    var errors = [];
    if(form.password !== form.confirmPassword){
        errors.push("Οι κωδικοί πρόσβασης δεν ταιριάζουν.");
    }

    return errors;
}