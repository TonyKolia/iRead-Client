import React from "react";

export default class Helpers {
    
    static formatDate = function (date){

        if(date !== undefined && date !== null){
            let newDate = new Date(date);
            var day = newDate?.getDate() > 9 ? newDate?.getDate() : "0"+newDate?.getDate();
            var month = (newDate?.getMonth() + 1) > 9 ? (newDate?.getMonth() + 1) : "0"+(newDate?.getMonth() + 1);
            return  (day + "/" + month + "/" + newDate?.getFullYear());
        }
    
        return "";
    }

    static addCommaIfNeeded = function(index, array){
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
            headers:{
                "Content-Type": "application/json",
                "Authorization": token !== "" ? `Bearer ${token}` : token
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
    }
}