const SchoolDetailsCard = ({title, info}) => {
    return ( 
        <div className="card m-3" style={{width: 300, height: 150}}>
            <div className="card-header">
                <strong>{title}</strong>
            </div>
            <div className="card-body">
                <p>{info.replace('|', ' ')}</p>
            </div>
            
        </div>
     );
}
 
export default SchoolDetailsCard;