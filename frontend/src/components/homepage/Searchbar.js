import { mdiClose, mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import axios from "axios";
import { useState, useEffect } from "react";

const Searchbar = ({data, setFiltered }) => {
    const [text, setText] = useState('');
    const [debouncedText, setDebouncedText] = useState('');

    const clearSearch = () => {
        setText('')
        setFiltered(data)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedText(text);
        }, 1000);  // Adjust delay as needed

        return () => clearTimeout(timer);
    }, [text]);

    useEffect(() => {
        if (debouncedText.trim() === '') {
            clearSearch()
            return;
        }

        axios.get(`${process.env.REACT_APP_API}/schools/search?q=${encodeURIComponent(debouncedText)}`, {withCredentials: true})
            .then((res) => {
                if (res.status === 200) {
                    setFiltered(res.data);
                }
            })
            .catch((err) => {
                console.error("Search error:", err);
            });
    }, [debouncedText]);

    return ( 
        <div className="input-group mt-4">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    {text.length > 0 ? 
                    <div onClick={clearSearch}>
                        <Icon path={mdiClose} size={1} />
                    </div>
                     : <Icon path={mdiMagnify} size={1} />}
                </span>
            </div>
            <input 
                value={text} 
                onChange={(e) => setText(e.target.value)}
                type="text" 
                className="form-control" 
                placeholder="Search"
            />
        </div>
    );
};

export default Searchbar;
