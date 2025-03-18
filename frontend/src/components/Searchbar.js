import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";

const Searchbar = ({ data, setFiltered }) => {
    const [text, setText] = useState('');

    const handleSearchChange = (event) => {
        setText(event);
        setTimeout(() => {
            setFiltered(
                data.filter((item) =>
                    item.centre_name.toLowerCase().includes(event.toLowerCase())
                )
            );
        }, 1000); // Delay the execution by 1 seconds
    };

    return ( 
        <div className="input-group mt-4">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                    <Icon path={mdiMagnify} size={1} />
                </span>
            </div>
            <input 
                value={text} 
                onChange={(e) => handleSearchChange(e.target.value)}
                type="text" 
                className="form-control" 
                placeholder="Search"
            />
        </div>
    );
};
 
export default Searchbar;
