import axios from "axios";
import { useEffect, useState } from "react";
import SchoolsList from "../school/SchoolsList";
import { useDispatch, useSelector } from "react-redux";
import { loadSchools, removeSchools } from "../../features/school/schoolSlice";
import Searchbar from "../Searchbar";
import FilterBtn from "../school/filters/FilterBtn";

const Home = () => {
    const ENDPOINT = `http://${window.location.hostname}:8000/schools`;

    const schools = useSelector(state => state.school.value);
    const [filtered, setFiltered] = useState([]);
    const [showFilter, setShowFilter] = useState(false)

    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            const result = await axios.get(ENDPOINT, {withCredentials: true});
            if (result.status === 200) {
                const data = result.data;
                // console.log(data)
                dispatch(loadSchools(data)); 
                // setFiltered(data); // 
            }
        } catch (err) {
            console.log("Error fetching data:", err);
        }
    };

    useEffect(() => {
        setFiltered(schools)
    }, [schools])

    useEffect(() => {
        dispatch(removeSchools()); // Clears Redux state before fetching new data
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return ( 
        <div>            
            {schools.length > 0 ?
            <>
            <Searchbar data={schools} setFiltered={setFiltered} />

            <div className="mt-3">
            <FilterBtn showFilter={showFilter} setShowFilter={setShowFilter} setFiltered={setFiltered} data={schools} />

            </div>

            <SchoolsList data={filtered} />
            </>
            :
            <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>
             }
        </div>
    );
};

export default Home;
