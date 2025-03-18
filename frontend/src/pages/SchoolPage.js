import { mdiEmail, mdiPhone } from "@mdi/js";
import Icon from "@mdi/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SchoolDetailsCard from "../components/school/SchoolDetailsCard";
import Navigationbar from "../components/navigation/Navigationbar";
import GoogleMapEmbed from "../components/GoogleMapEmbed";

const SchoolPage = () => {
    const { id } = useParams();
    // Get schools from Redux store
    const schools = useSelector((state) => state.school.value);

    // Find the school with the matching id
    const data = schools.find((school) => school._id.toString() === id.toString());

    // If no school found, show a loading message or handle it gracefully
    if (!data) {
        return <p>Loading or School not found...</p>;
    }

    return ( 
        <>
            <Navigationbar />
            <div className="container mt-3">
            <h3>{data.centre_name}</h3>
            <p>{data.centre_address}</p>

            <div className="row">
                <div className="col">
                    <p className="text-muted">Organisation Type: {data.organisation_description}</p>
                </div>
                <div className="col">
                    <a className="text-muted me-5" href={`tel:+65${data.centre_contact_no}`} rel="noreferrer">
                        <Icon path={mdiPhone} size={0.8} /> {data.centre_contact_no}
                    </a>
                    {data.centre_email_address !== "na" && (
                        <a className="text-muted" href={`mailto:${data.centre_email_address}`}>
                            <Icon path={mdiEmail} size={0.8} /> {data.centre_email_address}
                        </a>
                    )}
                </div>
            </div>

            <hr />
            <h4>Details Available</h4>
            <div className="row justify-content-center">
                {data.food_offered !== "na" && <SchoolDetailsCard title={"Food"} info={data.food_offered} />}
                {data.second_languages_offered !== "na" && <SchoolDetailsCard title={"Second Language"} info={data.second_languages_offered} />}
                {data.spark_certified !== "na" && <SchoolDetailsCard title={"Spark Certified"} info={data.spark_certified} />}
                {data.provision_of_transport !== "na" && <SchoolDetailsCard title={"Transport Provided"} info={data.provision_of_transport} />}
                {data.gst_regisration !== "na" && <SchoolDetailsCard title={"GST Registration"} info={data.gst_regisration} />}
            </div>

            <hr />
            <GoogleMapEmbed postalCode={data.postal_code} />
        </div>
        </>
        
    );
};

export default SchoolPage;
