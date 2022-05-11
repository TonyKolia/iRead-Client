import React from "react";
import "../css/style.css";
import logo from "../Images/test-book-img.jpeg";

export default function Basket() {
    return (
        <div className="cart-container">
            <h4><i className="fa-solid fa-basket-shopping"></i>Το καλάθι μου</h4>
            <table className="table">
                <thead>
                    <th></th>
                    <th>Τίτλος</th>
                    <th>Ημερομηνία επιστροφής</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr className="cart-item">
                        <td><img className="cart-img" src={logo} /></td>
                        <td className="align-middle"><a href="#"><h6>Η γεωγραφία είναι πολύ κουλ!</h6></a></td>
                        <td className="align-middle">23/04/2022</td>
                        <td className="align-middle"><button type="button" className="btn btn-primary btn-custom"><i className="fa-solid fa-trash-can"></i></button></td>
                    </tr>
                    <tr className="cart-item">
                        <td><img className="cart-img" src={logo} /></td>
                        <td className="align-middle"><a href="#"><h6>Η γεωγραφία είναι πολύ κουλ!</h6></a></td>
                        <td className="align-middle">23/04/2022</td>
                        <td className="align-middle"><button type="button" className="btn btn-primary btn-custom"><i className="fa-solid fa-trash-can"></i></button></td>
                    </tr>
                    <tr className="cart-item">
                        <td><img className="cart-img" src={logo} /></td>
                        <td className="align-middle"><a href="#"><h6>Η γεωγραφία είναι πολύ κουλ!</h6></a></td>
                        <td className="align-middle">23/04/2022</td>
                        <td className="align-middle"><button type="button" className="btn btn-primary btn-custom"><i className="fa-solid fa-trash-can"></i></button></td>
                    </tr>
                </tbody>
            </table>
            <div>
                <div className="cart-btn-container">
                    <button type="button" className="btn btn-primary btn-custom"><i className="fa-solid fa-arrow-left"></i>Επιστροφή</button>
                    <button type="button" className="btn btn-primary btn-custom"><i className="fa-solid fa-arrow-rotate-right"></i>Καθαρισμός</button>
                    <button type="button" className="btn btn-primary btn-custom"><i className="fa-solid fa-check"></i>Κράτηση</button>
                </div>
            </div>
        </div>
    );
}