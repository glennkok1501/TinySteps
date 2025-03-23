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
        }, 1000);

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
        <div className="position-relative">
            <div className="input-group">
                <span className="input-group-text border-0 bg-transparent">
                    <Icon path={mdiMagnify} size={1} className="text-muted" />
                </span>
                <input 
                    value={text} 
                    onChange={(e) => setText(e.target.value)}
                    type="text" 
                    className="form-control form-control-lg border-0 shadow-none"
                    placeholder="Search for preschools by name or location"
                    aria-label="Search preschools"
                />
                {text.length > 0 && (
                    <button 
                        className="btn position-absolute end-0 top-50 translate-middle-y me-2 text-muted"
                        onClick={clearSearch}
                        aria-label="Clear search"
                    >
                        <Icon path={mdiClose} size={0.8} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Searchbar;
