import React from "react";

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Helpers {

    static formatDate = function (date) {

        if (date !== undefined && date !== null) {
            let newDate = new Date(date);
            var day = newDate?.getDate() > 9 ? newDate?.getDate() : "0" + newDate?.getDate();
            var month = (newDate?.getMonth() + 1) > 9 ? (newDate?.getMonth() + 1) : "0" + (newDate?.getMonth() + 1);
            return (day + "/" + month + "/" + newDate?.getFullYear());
        }

        return "";
    }

    static getYearFromDate(date) {
        if (date !== undefined && date !== null) {
            let newDate = new Date(date);
            return newDate?.getFullYear();
        }

        return 0;
    }

    static successMessage = (message) => toast(message, { autoClose: 2500, closeButton: false, type: "success", transition: Slide, position: toast.POSITION.BOTTOM_RIGHT });
    static errorMessage = (message) => toast(message, { autoClose: 2500, closeButton: false, type: "error", transition: Slide, position: toast.POSITION.BOTTOM_RIGHT });
    static infoMessage = (message) => toast(message, { autoClose: 9000, closeButton: false, type: "info", transition: Slide, position: toast.POSITION.TOP_RIGHT });

    static addCommaIfNeeded = function (index, array) {
        return (index + 1 < array.length) ? ", " : "";
    }

    static performGet = (url, token) => {
        return fetch(url, {
            method: "GET",
            headers: { "Authorization": token !== "" ? `Bearer ${token}` : token }
        }).then(res => res.json());
    }

    static performPost = (url, data, token = "") => {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token !== "" ? `Bearer ${token}` : token
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
    }

    static performDelete = (url, token = "") => {
        return fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token !== "" ? `Bearer ${token}` : token
            }
        }).then(res => res.json());
    }

    static performPut = (url, data, token = "") => {
        return fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token !== "" ? `Bearer ${token}` : token
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
    }
}