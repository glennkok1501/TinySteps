const SchoolDetailsCard = ({title, info}) => {
    return ( 
        <>
        <div className="feature-card h-100 p-4 bg-white rounded-3 shadow-sm">
            <h5 className="card-title mb-3">{title}</h5>
            <p className="card-text">{info.replace('|', ' ')}</p>
        </div>

        </>
        
     );
}
 
export default SchoolDetailsCard;