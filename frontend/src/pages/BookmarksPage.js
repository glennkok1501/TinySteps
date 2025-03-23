import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import SchoolsList from "../components/school/SchoolsList";
import { loadSchools, removeSchools } from "../features/school/schoolSlice";
import Sidebar from "../components/navigation/Sidebar";

const BookmarksPage = () => {
    const ENDPOINT = `http://${window.location.hostname}:8000/schools`;
    const schools = useSelector(state => state.school.value);
    const [bookmarks, setBookmarks] = useState([]);
    const dispatch = useDispatch();

    // Memoize the fetchData function using useCallback
    const fetchData = useCallback(async () => {
        try {
            const result = await axios.get(ENDPOINT, { withCredentials: true });
            if (result.status === 200) {
                const data = result.data;
                dispatch(loadSchools(data)); 
            }
        } catch (err) {
            console.log("Error fetching data:", err);
        }
    }, [dispatch, ENDPOINT]); // Include 'dispatch' and 'ENDPOINT' as dependencies

    useEffect(() => {
        dispatch(removeSchools()); // Clears Redux state before fetching new data
        fetchData();
    }, [fetchData, dispatch]); // Add 'fetchData' and 'dispatch' as dependencies

    useEffect(() => {
        // Filter schools based on the bookmarked property
        if (schools && schools.length > 0) {
            const bookmarkedSchools = schools.filter(school => school.bookmarked); // Assuming 'bookmarked' is a boolean
            setBookmarks(bookmarkedSchools);
        }
    }, [schools]); // Update bookmarks whenever schools change

    return ( 
        
        <div className="layout-container">
            <Sidebar />
            <main className="main-content">
                <div className="hero-section">
                    <div className="container text-center">
                        <h1 className="display-4 mb-3">Bookmarks</h1>
                        <p className="lead">Shortlist your options and make good decisions</p>
                    </div>
                </div>
                <div className="container mt-5">
                    {bookmarks.length > 0 ?
                        <SchoolsList data={bookmarks} />
                        :
                        <div className="text-center mt-5">No Bookmarks</div>
                    }
                </div>
            </main>
        </div>
    );
}

export default BookmarksPage;
