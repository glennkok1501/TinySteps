import { mdiOpenInNew } from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Bookmark from "./Bookmark";
import ImageHandler from "./ImageHandler";

const SchoolView = ({data}) => {
    const HEIGHT = 250

    return (
        <div className="row mb-5 mt-3">
            <div className="col-8">
                <ImageHandler height={HEIGHT} index={parseInt(data.thumbnail)} />

            </div>
            <div className="col-4">
            <div className="card rounded" style={{height: HEIGHT}}>
                <div className="card-body p-4">
                    <div className="row">

                            <div className="col-11">
                    <Link className="text-decoration-none" to={`/school/${data._id}`}>

                                <h5 className="text-black">{data.centre_name}</h5>
                                <p className="text-muted">{`📍 ${data.centre_address}`}</p>
                    </Link>
                            
                            </div>

                        <div className="col-1">
                            <div className="btn d-flex justify-content-end">
                             <Bookmark schoolId={data._id} marked={data.bookmarked} />
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
                <div className="card-footer p-3 bg-secondary">
                    <div className="d-flex justify-content-between">
                        <a className="text-muted text-decoration-none" href={`tel:+65${data.centre_contact_no}}`} rel="noreferrer">
                            {`📞 ${data.centre_contact_no}`}
                        </a>
                        {data.centre_website !== "na" && <a className="text-muted  text-decoration-none" href={`https://${data.centre_website}`} rel="noreferrer" target="_blank">
                            Website <Icon size={0.8} path={mdiOpenInNew} />
                        </a>}
                    </div>
                </div>
            </div>
            </div>
                
        </div>
            
            
        
     );
}
 
export default SchoolView;