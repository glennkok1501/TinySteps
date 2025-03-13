const GoogleMapEmbed = ({ postalCode }) => {
    const mapUrl = `https://www.google.com/maps?q=${postalCode}&output=embed`;

    return (
        <div style={{ width: "100%", height: "400px" }}>
            <iframe
                title="Google Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={mapUrl}
            ></iframe>
        </div>
    );
};

export default GoogleMapEmbed;