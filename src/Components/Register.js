import React from "react";
import "../css/style.css";
import API from "../Helpers/API";
import Helpers from "../Helpers/Helpers";
import { useNavigate } from "react-router-dom";
import FieldError from "./FieldError";
import Loading from "./Loading";
import { UserContext, USER_ACTIONS } from "../App";

export default function Register(props) {

    const [idTypes, setIdTypes] = React.useState([]);
    const [genders, setGenders] = React.useState([]);
    const [errors, setErrors] = React.useState({});
    const [emptyFields, setEmptyFields] = React.useState([]);
    const [selectedTab, setSelectedTab] = React.useState(1);
    const [categories, setCategories] = React.useState([]);
    const [authors, setAuthors] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [selectedCategories, setSelectedCategories] = React.useState([]);
    const [selectedAuthors, setSelectedAuthors] = React.useState([]);
    const [displayedAuthors, setDisplayedAuthors] = React.useState([]);
    const [displayedCategories, setDisplayedCategories] = React.useState([]);
    const [authorSearchString, setAuthorSearchString] = React.useState("");
    const [categorySearchString, setCategorySearchString] = React.useState("");
    const user = React.useContext(UserContext);


    let letter = "";
    let maxFavoritesSelectedPerItem = 3;

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
        city: "",
        postalCode: "",
        telephone: "",
        email: "",
        acceptTerms: false,
        newsletter: false,
        favoriteCategories: [],
        favoriteAuthors: []
    });

    let navigate = useNavigate();

    React.useEffect(() => {

        //get categories
        setLoading(true);
        Helpers.performGet(API.API_URL_GET_CATEGORIES)
            .then(response => {
                setLoading(false);
                if (response.success) {
                    setCategories(response.data);
                    return setDisplayedCategories(response.data);
                }
                else {
                    if (response.statusCode == "404")
                        return setCategories([]);
                    else
                        return navigate("/error");
                }
            });

        //get authors
        setLoading(true);
        Helpers.performGet(API.API_URL_GET_AUTHORS)
            .then(response => {
                setLoading(false);
                if (response.success) {
                    setAuthors(response.data);
                    return setDisplayedAuthors(response.data);
                }
                else {
                    if (response.statusCode == "404")
                        return setAuthors([]);
                    else
                        return navigate("/error");
                }
            });

        //get genders
        setLoading(true);
        Helpers.performGet(API.API_URL_GET_GENDERS)
            .then(response => {
                setLoading(false);
                if (response.success)
                    return setGenders(response.data);
                else {
                    if (response.statusCode == "404")
                        return setGenders([]);
                    else
                        return navigate("/error");
                }
            });

        //get id types
        setLoading(true);
        Helpers.performGet(API.API_URL_GET_ID_TYPES)
            .then(response => {
                setLoading(false);
                if (response.success)
                    return setIdTypes(response.data);
                else {
                    if (response.statusCode == "404")
                        return setIdTypes([]);
                    else
                        return navigate("/error");
                }
            });
    }, []);

    //author search
    React.useEffect(() => {

        if (authorSearchString === "")
            setDisplayedAuthors(authors);
        else
            setDisplayedAuthors(authors.filter(author => author.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(authorSearchString.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))));

    }, [authorSearchString])

    //category search
    React.useEffect(() => {

        if (categorySearchString === "")
            setDisplayedCategories(categories);
        else
            setDisplayedCategories(categories.filter(category => category.description.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(categorySearchString.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))));

    }, [categorySearchString]);


    const clearAuthorSearch = () => setAuthorSearchString("");
    const clearCategorySearch = () => setCategorySearchString("");
    const handleCategorySearchChange = (e) => setCategorySearchString(e.target.value);
    const handleSearchChange = (e) => setAuthorSearchString(e.target.value);

    //favorite author change handler
    const handleFavoriteAuthorChange = (e) => {
        let { id } = e.target;
        id = id.split('-')[1];

        setSelectedAuthors(oldSelected => {

            if (oldSelected.includes(id))
                return oldSelected.filter(x => x !== id);
            else {
                if (oldSelected.length === maxFavoritesSelectedPerItem)
                    oldSelected.splice(0, 1);
                return [...oldSelected, id];
            }
        });
    }

    //favorite category change handler
    const handleFavoriteCategoryChange = (e) => {
        let { id } = e.target;
        id = id.split('-')[1];

        setSelectedCategories(oldSelected => {

            if (oldSelected.includes(id))
                return oldSelected.filter(x => x !== id);
            else {
                if (oldSelected.length === maxFavoritesSelectedPerItem)
                    oldSelected.splice(0, 1);
                return [...oldSelected, id];
            }
        });
    }

    //general register form change handler
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setRegisterForm(prevData => {
            return {
                ...prevData,
                [name]: type === "checkbox" ? checked : value
            }
        });
    }

    //register form submit handler
    const submitRegisterForm = (e) => {
        setLoading(true);
        e.preventDefault();
        registerForm.favoriteAuthors = selectedAuthors;
        registerForm.favoriteCategories = selectedCategories;
        Helpers.performPost(API.API_URL_REGISTER, registerForm)
            .then(response => {
                setLoading(false);
                if (!response.success) {
                    if (response.statusCode == 500 || !response.data)
                        return navigate("/error");

                    if (response.data.validationFailType == 0) {
                        setErrors({});
                        return setEmptyFields(response.data.emptyFields);
                    }

                    if (response.data.validationFailType == 1) {
                        setEmptyFields([]);
                        return setErrors(response.data.errors);
                    }
                }
                else {
                    Helpers.successMessage("Ο λογαριασμός σας δημιουργήθηκε με επιτυχία!");
                    Helpers.performPost(API.API_URL_LOGIN, { username: registerForm.username, password: registerForm.password })
                        .then(response => user.dispatchUser({ type: USER_ACTIONS.LOGIN, payload: { user: response.data } }));

                    return navigate("/");
                }
            });
    }

    return (
        <div className="register-container">
            <h3 className="form-header" style={{ paddingTop: "3rem" }}><i className="fa-solid fa-user-plus"></i>Δημιουργία λογαριασμού</h3>
            {
                
                    <>
                        {loading && <Loading />}
                        <ul className="nav justify-content-center mini-menu">
                            <li onClick={() => setSelectedTab(1)} className={`mini-menu-item fromLeft ${selectedTab == 1 ? "selected" : ""}`}>Στοιχεία λογαριασμού</li>
                            <li onClick={() => setSelectedTab(2)} className={`mini-menu-item fromLeft ${selectedTab == 2 ? "selected" : ""}`}>Προσωπικά στοιχεία</li>
                            <li onClick={() => setSelectedTab(3)} className={`mini-menu-item fromLeft ${selectedTab == 3 ? "selected" : ""}`}>Στοιχεία επικοινωνίας</li>
                            <li onClick={() => setSelectedTab(4)} className={`mini-menu-item fromLeft ${selectedTab == 4 ? "selected" : ""}`}>Προτιμήσεις</li>
                        </ul>
                        <form name="register-form">
                            {
                                selectedTab == 1 && <div className="register-form-tab" id="account-info">
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
                            }
                            {
                                selectedTab == 2 && <div className="register-form-tab" id="personal-info">
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
                                        <input type="text" value={registerForm.birthdate} name="birthdate" onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => (e.target.type = 'text')} onChange={handleChange} placeholder="Ημερομηνία γέννησης" />
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
                                        <i className="fa-solid fa-id-card" title={registerForm.idNumber != "" ? "Αριθμός εγγράφου ταυτοποίησης" : ""}></i>
                                        <input type="text" name="idNumber" value={registerForm.idNumber} onChange={handleChange} placeholder="Αριθμός εγγράφου ταυτοποίησης" />
                                        {emptyFields.includes("idNumber") && <i class="fa-solid fa-star-of-life"></i>}
                                    </div>
                                    {errors.idNumber && <FieldError error={errors.idNumber} />}
                                    <hr />
                                </div>
                            }
                            {
                                selectedTab == 3 && <div className="register-form-tab" id="contact-info">
                                    <div className="form-control-container">
                                        <i className="fa-solid fa-location-dot" title={registerForm.address != "" ? "Διεύθυνση κατοικίας" : ""}></i>
                                        <input type="text" name="address" value={registerForm.address} onChange={handleChange} placeholder="Διεύθυνση κατοικίας" />
                                        {emptyFields.includes("address") && <i class="fa-solid fa-star-of-life"></i>}
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
                            }
                            {
                                selectedTab == 4 && <div className="register-form-tab">
                                    <h6 style={{ textAlign: "center", paddingTop: "0.5rem" }}>Επιλέξτε εώς {maxFavoritesSelectedPerItem} συγγραφείς και εώς {maxFavoritesSelectedPerItem} κατηγορίες που σας ενδιαφέρουν.</h6>
                                    <div className="register-favorite-container">
                                        <div className="rergister-favorite-item">
                                            <h6><i className="fa-solid fa-feather-pointed"></i>Συγγραφείς</h6>
                                            <div className="form-control-container" id="filter-search-author">
                                                <i className="fa-solid fa-magnifying-glass"></i>
                                                <input type="text" name="search-author" value={authorSearchString} onChange={handleSearchChange} placeholder="Αναζήτηση..." />
                                                {authorSearchString !== "" && <i onClick={clearAuthorSearch} className="fa-solid fa-xmark"></i>}
                                            </div>
                                            <div className="register-favorite-list" id="author-list">

                                                <ul className="list-group">
                                                    {
                                                        displayedAuthors.map(author => {

                                                            let normalizedFirstLetter = author.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").substring(0, 1);
                                                            let letterChanged = false;
                                                            if (normalizedFirstLetter !== letter) {
                                                                letter = normalizedFirstLetter;
                                                                letterChanged = true;
                                                            }

                                                            return (
                                                                <li key={author.id}>
                                                                    {letterChanged && <h6 className="letter-seperator">{letter}</h6>}
                                                                    <input className="form-check-input" onChange={handleFavoriteAuthorChange} id={`author-${author.id}`} type="checkbox" checked={selectedAuthors.includes(String(author.id))} />
                                                                    <label className="form-check-label" htmlFor={`author-${author.id}`}>{`${author.name}`}</label>
                                                                </li>);
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                            {errors.favoriteAuthors && <FieldError error={errors.favoriteAuthors} />}
                                        </div>
                                        <div className="rergister-favorite-item">
                                            <h6><i className="fa-solid fa-tags"></i>Κατηγορίες</h6>
                                            <div className="form-control-container" id="filter-search-author">
                                                <i className="fa-solid fa-magnifying-glass"></i>
                                                <input type="text" name="search-author" value={categorySearchString} onChange={handleCategorySearchChange} placeholder="Αναζήτηση..." />
                                                {categorySearchString !== "" && <i onClick={clearCategorySearch} className="fa-solid fa-xmark"></i>}
                                            </div>
                                            <div className="register-favorite-list" id="category-list">
                                                <ul className="list-group">
                                                    {
                                                        displayedCategories.map(category => {
                                                            return (
                                                                <li key={category.id}>
                                                                    <input className="form-check-input" onChange={handleFavoriteCategoryChange} id={`category-${category.id}`} type="checkbox" checked={selectedCategories.includes(String(category.id))} />
                                                                    <label className="form-check-label" htmlFor={`category-${category.id}`}>{`${category.description}`}</label>
                                                                </li>);
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                            {errors.favoriteCategories && <FieldError error={errors.favoriteCategories} />}
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            }

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
                            {emptyFields.length > 0 && <div style={{ marginTop: "15px" }} className="alert alert-danger" role="alert"><i class="fa-solid fa-star-of-life"></i>Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία.</div>}
                            {Object.keys(errors).length > 0 && <div style={{ marginTop: "15px" }} className="alert alert-danger" role="alert"><i className="fa-solid fa-circle-exclamation"></i>Προέκυψαν σφάλματα με τα δεδομένα που δώσατε. Παρακαλώ διορθώστε τα και προσπαθήστε ξανά.</div>}
                            <div style={{ display: "flex", justifyContent: "center", paddingTop: "1rem" }}>
                                <button onClick={submitRegisterForm} className="btn btn-primary btn-custom"><i className="fa-solid fa-check"></i>Δημιουργία</button>
                            </div>
                        </form>
                    </>
            }

        </div>
    );

}



