import React from "react";
import "../css/style.css";
import { ALERT_TYPES } from "../App";

export default function Alert(props) {

    const [visibilityProps, setVisibilityProps] = React.useState({ visible: true, time: 2000 });

    React.useEffect(() => {
        setTimeout(() => setVisibilityProps({...visibilityProps, visible: false }), visibilityProps.time);
    }, [])

    let cssClass = "";
    switch (props.alert.type) {
        case ALERT_TYPES.FAIL:
            cssClass = "alert-danger";
            break;
        case ALERT_TYPES.SUCCESS:
            cssClass = "alert-success";
            break;
        default:
            break;
    }

    return (
        visibilityProps.visible ? <div className={`alert alert-custom ${cssClass}`} role="alert">{props.alert.text}</div> : <></>
    );


}