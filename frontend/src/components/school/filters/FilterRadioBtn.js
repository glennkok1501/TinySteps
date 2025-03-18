import axios from "axios";
import { useEffect, useState } from "react";

const FilterRadioBtn = ({option, title, setFilters}) => {

    const [options, setOptions] = useState([])

    useEffect(() => {
        const ENDPOINT = `http://${window.location.hostname}:8000/schools`;
            axios.get(`${ENDPOINT}/options?q=${option}`, {withCredentials: true})
                .then((res) => {
                    if (res.status === 200) {
                        // console.log(res.data)
                        setOptions(res.data)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            

    }, [option])

    const optionTextHandler = (text) => {
        if (text === "na") {
            return "None"
        }

        return text.replaceAll("|", ", ")
    }

    const onSelectHandler = (o) => {
        setFilters((state) => (
            state.map((item) => item.title === title ? {...item, selected: o} : item
        )))
    }

    return ( 
    
            <div>
                <h6>{title}</h6>
                {
                    options.map((o, index) => (
                        <div  key={index}>
                            <input onClick={() => onSelectHandler(o)} className="form-check-input" type="radio"  name={title} id={title} />
                            <label className="ms-2 form-check-label">
                                {optionTextHandler((o))}
                            </label>
                        </div>
                        
                    ))
                }

            </div>
    
        
     );
}
 
export default FilterRadioBtn;