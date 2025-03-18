import { useState } from "react";
import Loading from "../Loading";
import InfiniteScroll from 'react-infinite-scroll-component';
import SchoolView from "./SchoolView";

const SchoolsList = ({ data }) => {
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     console.log(data);
    // }, [data]);

    // Check if data is defined and an array
    const safeData = Array.isArray(data) ? data : [];

    return (
        <div>
            <InfiniteScroll
                dataLength={safeData.length}
                loader={<Loading isLoading={isLoading} setIsLoading={setIsLoading} />}
            >
                {
                    safeData.map((school) => (
                        <div key={school._id}>
                            {school.centre_name !== "na" && <SchoolView data={school} />}
                        </div>
                    ))
                }
            </InfiniteScroll>
        </div>
    );
};

export default SchoolsList;
