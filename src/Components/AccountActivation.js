import React from "react";
import "../css/style.css";
import Helpers from "../Helpers/Helpers";
import API from "../Helpers/API";
import Loading from "./Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function AccountActivation() {

    const { userId, token } = useParams();

    let navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);


    const submitActivation = () => {

        if (userId === "" || userId === null || userId === undefined || token === "" || token === null || token === undefined)
            return;

        setLoading(true);
        let url = API.API_URL_POST_ACTIVATE_ACCOUNT.replace(":userId", userId).replace(":token", token);
        Helpers.performPost(url)
            .then(response => {
                setLoading(false);
                if (response.success) {
                    if (response.data) {
                        Helpers.successMessage("Ο λογαριασμός σας ενεργοποιήθηκε με επιτυχία!");
                        return navigate("/");
                    }
                    else
                        return navigate("/error");
                }
                else
                    return navigate("/error");

            });
    }

    React.useEffect(() => {

        submitActivation();


    }, []);

   

    return (

        <>
            {loading && <Loading />}
        </>


    );



}