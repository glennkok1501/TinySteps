import { mdiOpenInNew } from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SchoolView = ({data}) => {
    return ( 
            <div className="card m-4">
                <div className="card-body p-4">
                <Link className="text-decoration-none" to={`/school/${data._id}`}>

                    <h3 className="text-black">{data.centre_name}</h3>
                    <p className="text-muted">{data.centre_address}</p>
                </Link>
                    
                </div>
                <div className="card-footer p-3">
                    <div className="d-flex justify-content-between">
                        <a className="text-muted" href={`tel:+65${data.centre_contact_no}}`} rel="noreferrer">
                            {`Contact Number: ${data.centre_contact_no}`}
                        </a>
                        {data.centre_website !== "na" && <a className="text-muted" href={`https://${data.centre_website}`} rel="noreferrer" target="_blank">
                            Check out website <Icon size={0.8} path={mdiOpenInNew} />
                        </a>}
                    </div>
                </div>
            </div>
        
     );
}
 
export default SchoolView;