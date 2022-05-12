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

    static performPost = async (url, data) => {

        let response = await fetch(url, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        let responseJson = await response.json();
        return  responseJson;
    }
}

