import { mdiEmail, mdiPhone } from "@mdi/js";
import Icon from "@mdi/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SchoolDetailsCard from "../components/school/SchoolDetailsCard";
import Navigationbar from "../components/navigation/Navigationbar";
import GoogleMapEmbed from "../components/GoogleMapEmbed";
import Bookmark from "../components/school/Bookmark";
import { useEffect, useState } from "react";
import axios from "axios";

const SchoolPage = () => {
    const { id } = useParams();
    const schools = useSelector((state) => state.school.value);

    // Initialize state as null (not undefined)
    const [data, setData] = useState(null);

    // First, try to get school data from Redux store
    useEffect(() => {
        const cachedSchool = schools.find((school) => school._id.toString() === id.toString());
        if (cachedSchool) {
            setData(cachedSchool);
        } else {
            // Fetch from API if not found in Redux
            axios.get(`${process.env.REACT_APP_API}/schools/${id}`, {withCredentials: true})
                .then((res) => {
                    if (res.status === 200) {
                        setData(res.data);
                    }
                })
                .catch((err) => {
                    console.error("Error fetching school details:", err);
                });
        }
    }, [id, schools]); // Depend on `id` and `schools` for updates

    if (!data) {
        return <p>Loading school details...</p>;
    }

    return (
        <>
            <Navigationbar />

            <div className="container mt-3">
                <div className="row">
                    <div className="col-11">
                        <h3>{data.centre_name}</h3>
                        <p>{data.centre_address}</p>
                    </div>
                    <div className="col-1">
                        <div className="btn d-flex justify-content-end">
                            <Bookmark schoolId={data._id} marked={data.bookmarked} />
                        </div>
                    </div>
                </div>

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
