import SchoolView from "./SchoolView";

const SchoolsList = ({ data }) => {
    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {data.map((school) => (
                <div className="col" key={school._id}>
                    <SchoolView school={school} />
                </div>
            ))}
        </div>
    );
};

export default SchoolsList;
