import axios from "axios";
import { useEffect, useState } from "react";
import SchoolsList from "../school/SchoolsList";
import { useDispatch, useSelector } from "react-redux";
import { loadSchools, removeSchools } from "../../features/school/schoolSlice";
import Searchbar from "./Searchbar";
import FilterBtn from "../school/filters/FilterBtn";

const Home = () => {
    const ENDPOINT = `http://${window.location.hostname}:8000/schools`;
    const user = useSelector(state => state.user.value).payload 
    const schools = useSelector(state => state.school.value);
    const [filtered, setFiltered] = useState([]);
    const [showFilter, setShowFilter] = useState(false)

    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            const result = await axios.get(ENDPOINT, {withCredentials: true});
            if (result.status === 200) {
                const data = result.data;
                console.log(data)
                dispatch(loadSchools(data));
            }
        } catch (err) {
            console.log("Error fetching data:", err);
        }
    };

    useEffect(() => {
        setFiltered(schools)
    }, [schools])

    useEffect(() => {
        dispatch(removeSchools());
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {schools.length > 0 ? (
                <>
                    <div className="hero-section">
                        <div className="container text-center">
                            <h1 className="display-4 mb-3">Find Your Perfect Preschool</h1>
                            <p className="lead mb-4">Discover the best early education centers in Singapore</p>
                        </div>
                    </div>

                    <div className="container">
                        <div className="search-container mt-3">
                            <Searchbar data={schools} setFiltered={setFiltered} />
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="welcome-text">
                                Welcome back, {user.username}! 
                                {filtered.length > 0 && 
                                    <span className="text-muted ms-2">
                                        Showing {filtered.length} schools
                                    </span>
                                }
                            </div>
                            <FilterBtn 
                                showFilter={showFilter} 
                                setShowFilter={setShowFilter} 
                                setFiltered={setFiltered} 
                                data={schools}
                                className="filter-button" 
                            />
                        </div>

                        <SchoolsList data={filtered} />
                    </div>
                </>
            ) : (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
