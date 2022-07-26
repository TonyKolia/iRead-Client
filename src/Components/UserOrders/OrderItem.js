import React from "react";
import "../../css/style.css";
import API from "../../Helpers/API";
import Helpers from "../../Helpers/Helpers";
import { useNavigate } from "react-router-dom";
import { Collapse } from "bootstrap";

export default function Orders(props) {

    let navigate = useNavigate();
    const [collapse, setCollapse] = React.useState(null);
    React.useEffect(() => {Helpers.setupTooltips(); setupToggle(`order${props.order.id}`)}, []);

    const setupToggle = (id) =>{
        setCollapse(new Collapse(document.getElementById(id), {toggle: false}));
    }

    const toggle = () => collapse.toggle();


    return (
        <>
            <tr className="order-tr" onClick={toggle} style={{verticalAlign: "middle"}}>
                <td>{`#${props.order.id}`}</td>
                <td>{Helpers.formatDate(props.order.orderDate)}</td>
                <td>{Helpers.formatDate(props.order.returnDate)}</td>
                <td>{props.order.status}</td>
                <td style={{width: "1%"}}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#order${props.order.id}`} aria-expanded="false" aria-controls={`order${props.order.id}`}>
                    </button>
                </td>
            </tr>
            <tr>
                <td className="hidden-td" colSpan={5}>
                    <div id={`order${props.order.id}`} className="accordion-collapse collapse" aria-labelledby={`order${props.order.id}`}>
                        <div className="accordion-body">
                            <div className="row row row-cols-1 row-cols-md-3">
                                {
                                    props.order.books.map(book => {

                                        return(
                                            <div className="col">
                                                <div className="order-items-container">
                                                    <a href={`/book/${book.id}`}><img title={book.title} data-bs-toggle="tooltip" data-bs-placement="top" className="order-img" src={`${API.API_URL_GET_BOOK_IMAGE}${book.imagePath}`}/></a>
                                                </div>
                                            </div>
                                        );

                                    })
                                }
                            </div>
                        </div>
                    </div>
                </td>

            </tr>
        </>


    );
}