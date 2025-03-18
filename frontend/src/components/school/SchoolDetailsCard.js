const SchoolDetailsCard = ({title, info}) => {
    return ( 
        <div className="card p-0 m-3" style={{width: 300, height: 150}}>
            <div className="card-header bg-secondary ">
                <strong>{title}</strong>
            </div>
            <div className="card-body p-3">
                <p>{info.replace('|', ' ')}</p>
            </div>
            
        </div>
     );
}
 
export default SchoolDetailsCard;