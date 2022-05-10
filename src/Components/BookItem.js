import React from "react";
import "../css/style.css";
import logo from "../Images/test-book-img.jpeg";

export default function BookItem(props) {
    return (
        <div className="col">
            <div className="card card-custom">
                <i className="fa-solid fa-bookmark"></i>
                <img className="card-img-top card-img" src={"https://localhost:7190/api/Image/Book/" + props.book.imagePath} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title book-title"><a href={"/book/" + props.book.id}>{props.book.title}</a></h5>
                    {props.book.categories.map(x => <span className="book-title card-text">{x.description}</span>)}
                    <button type="button" className="btn btn-primary btn-custom card-btn"><i className="fa-solid fa-basket-shopping"></i>Προσθήκη στο καλάθι</button>
                </div>
            </div>
        </div>
    );
}