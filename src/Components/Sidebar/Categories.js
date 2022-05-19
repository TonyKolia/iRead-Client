import React from "react";
import "../../css/style.css";

export default function Categories(props) {

    const [selected, setSelected] = React.useState(props.selectedCategory);


    React.useEffect(() => {
        setSelected(props.selectedCategory);
    }, [props.selectedCategory])

    const selectCategory = (categoryId) => {
        props.setCategory(categoryId);
        props.setFilters({ authors: [], publishers: [] });
    }

    return (
        <div className="accordion-item">
            <h5 className="accordion-header" id="headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#categories" aria-expanded="false" aria-controls="collapseOne">
                    <h5><i className="fa-solid fa-tags"></i>Κατηγορίες</h5>
                </button>
            </h5>
            <div id="categories" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <ul className="category-list">
                        {props.categories?.map(category => <li className={`${category.id == selected ? "active" : ""}`} key={category.id} onClick={() => { selectCategory(category.id); }}>{category.description}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
}