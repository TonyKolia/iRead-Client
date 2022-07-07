import React from "react";
import "../../css/style.css";

export default function Years(props) {

    const [minValue, setMinValue] = React.useState(props.selectedYears.minYear); //
    const [maxValue, setMaxValue] = React.useState(props.selectedYears.maxYear); //

    const handleChange = (e) => {

        const { value, name } = e.target;

        if (name == "min"){
            setMinValue(Math.min(value, maxValue - 1));
            props.setYears(oldYears => {
                return {...oldYears, minYear: Math.min(value, maxValue - 1)}
            });
        }
            
        if (name == "max"){
            setMaxValue(Math.max(value, minValue + 1));
            props.setYears(oldYears => {
                return {...oldYears, maxYear: Math.max(value, minValue + 1)}
            });
        }
            
        props.setCategory(null);
    }

    React.useEffect(() => {

        if((props.selectedYears.minYear == 0 || props.selectedYears.minYear < props.years.minYear) && props.years.minYear !== undefined)
            setMinValue(props.years.minYear)
        else
            setMinValue(props.selectedYears.minYear);
        
        if((props.selectedYears.maxYear == 9999 || props.selectedYears.maxYear > props.years.maxYear) && props.years.maxYear !== undefined)
            setMaxValue(props.years.maxYear);
        else
            setMaxValue(props.selectedYears.maxYear);

    },[props.years, props.selectedYears])

    return (
        <div>
             <div className="ex-accordion-button">
                <h6><i className="fa-solid fa-calendar"></i>Έτος έκδοσης</h6>
            </div>
            <div className="filter-data-container" style={{overflow:"hidden", borderBottom: "none"}} id="year">
                <div className="year-slider-container">
                    <input type="range" onChange={handleChange} name="min" className="thumb thumb--zindex-3" min={props.years.minYear} max={props.years.maxYear} value={minValue} />
                    <input type="range" onChange={handleChange} name="max" className="thumb thumb--zindex-4" min={props.years.minYear} max={props.years.maxYear} value={maxValue} />
                    <div className="slider">
                        <div className="slider__track" />
                        <div className="slider__range" />
                        <div className="slider__left-value">{minValue}</div>
                        <div className="slider__right-value">{maxValue}</div>
                    </div>
                </div>

            </div>
        </div>
    );
}