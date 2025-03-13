import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading";

const SchoolsList = () => {

    const [schools, setSchools] = useState([]);
    const [dataOffset, setDataOffSet] = useState("/api/action/datastore_search?resource_id=d_696c994c50745b079b3684f0e90ffc53");
    const [isLoading, setIsLoading] = useState(true);
    const ENDPOINT = "https://data.gov.sg";

    const fetchData = async () => {
        let nextOffset = dataOffset;
        let allSchools = [];
        
        // Fetch data in a loop until there's no "next" link and no records
        while (nextOffset) {
            try {
                const result = await axios.get(ENDPOINT + nextOffset);
                if (result.status === 200) {
                    const data = result.data.result.records;
                    console.log(data)
                    // If there are no records, break the loop (no more data to fetch)
                    if (data.length === 0) {
                        break;
                    }
                    
                    allSchools = [...allSchools, ...data]; // Accumulate results
                    
                    // Check if there's a "next" link to continue
                    nextOffset = result.data.result._links ? result.data.result._links.next : null;
                }
            } catch (err) {
                console.log("Error fetching data:", err);
                break; // Break the loop if there's an error
            }
        }
        
        // Once all data is fetched, update the state
        setSchools(allSchools);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run on initial mount

    return ( 
        <div>
            <Loading isLoading={isLoading} setIsLoading={setIsLoading} />
            {/* Render your school data here */}
            <ul>
                {schools.map((school, index) => (
                    <li key={index}>{school.name}</li> // Replace "name" with the actual property you want to display
                ))}
            </ul>
        </div>
    );
};

export default SchoolsList;