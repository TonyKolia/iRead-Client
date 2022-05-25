import React from "react";
import "../css/style.css";
import Categories from "./Sidebar/Categories";

export default function ActiveFilters(props) {

    const [filterTags, setFiltersTags] = React.useState([]);

    React.useEffect(() => {

        let tempTags = [];

        var labels = document.getElementsByTagName("label");
        if (!props.activeFilters.filters || !props.activeFilters.filters.authors || !props.activeFilters.filters.publishers || !props.activeFilters.years || !props.activeFilters.searchString)
            return;

        if (props.activeFilters.filters.authors.length > 0) {

            props.activeFilters.filters.authors.forEach(author => {

                for (var i = 0; i < labels.length; i++) {
                    if (labels[i].htmlFor === "author-" + author) {
                        tempTags.push(labels[i].innerText);
                    }
                }
            });
        }

        if (props.activeFilters.filters.publishers.length > 0) {

            props.activeFilters.filters.publishers.forEach(publisher => {

                for (var i = 0; i < labels.length; i++) {
                    if (labels[i].htmlFor === "publisher-" + publisher) {
                        tempTags.push(labels[i].innerText);
                    }
                }
            });
        }

        if (props.activeFilters?.years?.minYear !== 0) {
            tempTags.push(`από ${props.activeFilters.years.minYear}`);
        }
        if (props.activeFilters?.years?.maxYear !== 9999) {
            tempTags.push(`έως ${props.activeFilters.years.maxYear}`);
        }

        if(props.activeFilters.searchString.current !== "")
        tempTags.push(`"${props.activeFilters.searchString.current}"`);




        setFiltersTags(tempTags);

    }, [props.activeFilters]);

    return (
        <div className="activeFiltersContainer">
            {filterTags.map(x => <span className="badge" key={x}>{x}</span>)}
        </div>
    );

}