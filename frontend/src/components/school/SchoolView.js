import { Link } from "react-router-dom";
import { mdiPhone, mdiMapMarker } from "@mdi/js";
import Icon from "@mdi/react";
import ImageHandler from "./ImageHandler";

const SchoolView = ({school}) => {
    return (
        <div className="card h-100 school-card">
            <ImageHandler height={120} index={parseInt(school.thumbnail)} />
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">
                        <Link 
                            to={`/school/${school._id}`} 
                            className="text-decoration-none text-dark stretched-link"
                        >
                            {school.centre_name}
                        </Link>
                    </h5>
                </div>
                
                <div className="mb-3">
                    <p className="card-text text-muted small mb-1">
                        <Icon path={mdiMapMarker} size={0.6} className="me-1" />
                        {school.centre_address}
                    </p>
                    <p className="card-text text-muted small">
                        <Icon path={mdiPhone} size={0.6} className="me-1" />
                        {school.centre_contact_no}
                    </p>
                </div>

                {school.spark_certified.toLowerCase() !== "no" && (
                    <span className="badge bg-success me-1">SPARK Certified</span>
                )}
                {school.provision_of_transport.toLowerCase() !== "no" && (
                    <span className="badge bg-info me-1">Transport Available</span>
                )}
            </div>
        </div>
     );
}
 
export default SchoolView;