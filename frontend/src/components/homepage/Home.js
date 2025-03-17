import axios from "axios";
import { useEffect, useState } from "react";
import SchoolsList from "../school/SchoolsList";
import { useDispatch, useSelector } from "react-redux";
import { loadSchools, removeSchools } from "../../features/school/schoolSlice";
import Searchbar from "../Searchbar";

const Home = () => {
    const ENDPOINT = `http://${window.location.hostname}:8000/schools`;

    const schools = useSelector(state => state.school.value);
    const [filtered, setFiltered] = useState([]);

    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            const result = await axios.get(ENDPOINT);
            if (result.status === 200) {
                const data = result.data;
                dispatch(loadSchools(data)); 
                setFiltered(data); // 
            }
        } catch (err) {
            console.log("Error fetching data:", err);
        }
    };

    useEffect(() => {
        dispatch(removeSchools()); // Clears Redux state before fetching new data
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return ( 
        <div>
            <Searchbar data={schools} setFiltered={setFiltered} />
            <SchoolsList data={filtered} />
        </div>
    );
};

export default Home;
