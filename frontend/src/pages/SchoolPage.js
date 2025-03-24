import { mdiEmail, mdiPhone, mdiMapMarker } from "@mdi/js";
import Icon from "@mdi/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SchoolDetailsCard from "../components/school/SchoolDetailsCard";
import GoogleMapEmbed from "../components/GoogleMapEmbed";
import Bookmark from "../components/school/Bookmark";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/navigation/Sidebar";
import ReviewsList from "../components/reviews/ReviewsList";
import ReviewBtn from "../components/reviews/ReviewBtn";
import ReviewSection from "../components/reviews/ReviewSection";

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
        <div className="layout-container">
            <Sidebar />
            <main className="main-content">
                <div className="school-header">
                    <div className="container">
                        <div className="row align-items-center py-4">
                            <div className="col-md-8">
                                <h1 className="display-5 mb-2">{data.centre_name}</h1>
                                <p className="text-muted mb-2">
                                    <Icon path={mdiMapMarker} size={0.8} className="me-2" />
                                    {data.centre_address}
                                </p>
                                <p className="mb-3">
                                    <span className="badge bg-warning me-2">
                                        {data.organisation_description}
                                    </span>
                                    {data.spark_certified.toLowerCase() !== "no" && (
                                        <span className="badge bg-success me-2">SPARK Certified</span>
                                    )}
                                    {data.provision_of_transport.toLowerCase() !== "no" && (
                                        <span className="badge bg-info">Transport Available</span>
                                    )}
                                </p>
                            </div>
                            {schools.length > 0 && <div className="col-md-4 text-md-end">
                                <Bookmark schoolId={data._id} marked={data.bookmarked} />
                            </div>}
                        </div>
                    </div>
                </div>

                <div className="container py-4">
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <div className="contact-card p-4 bg-white rounded-3 shadow-sm">
                                <h5 className="mb-3">Contact Information</h5>
                                <div className="d-flex align-items-center mb-2">
                                    <Icon path={mdiPhone} size={0.8} className="me-2" />
                                    <a href={`tel:+65${data.centre_contact_no}`} className="text-decoration-none text-black">
                                        {data.centre_contact_no}
                                    </a>
                                </div>
                                {data.centre_email_address !== "na" && (
                                    <div className="d-flex align-items-center">
                                        <Icon path={mdiEmail} size={0.8} className="me-2" />
                                        <a href={`mailto:${data.centre_email_address}`} className="text-decoration-none text-black">
                                            {data.centre_email_address}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="row g-4">
                        {data.food_offered !== "na" && (
                            <div className="col-md-4">
                                <SchoolDetailsCard title="Food Options" info={data.food_offered} />
                            </div>
                        )}
                        {data.second_languages_offered !== "na" && (
                            <div className="col-md-4">
                                <SchoolDetailsCard title="Second Language" info={data.second_languages_offered} />
                            </div>
                        )}
                        {data.gst_regisration !== "na" && (
                            <div className="col-md-4">
                                <SchoolDetailsCard title="GST Registration" info={data.gst_regisration} />
                            </div>
                        )}
                    </div>
                    
                    {/* Reviews Section */}
                    <ReviewSection schoolId={id} />

                    <div className="mt-4">
                        <h4 className="mb-3">Location</h4>
                        <div className="map-container rounded-3 overflow-hidden shadow-sm">
                            <GoogleMapEmbed postalCode={data.postal_code} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SchoolPage;
