import { mdiBookmarkOutline, mdiHelpCircleOutline, mdiMagnify, mdiMapOutline } from "@mdi/js";
import Icon from "@mdi/react";

const HomeSideBar = () => {

    const style = "hover btn p-4 bg-highlight"

    return ( 
        <div className="d-flex flex-column bd-highlight align-items-center">
            <div className={style}>
                <Icon path={mdiMagnify} size={1} />
                <p>Search</p>
            </div>
            <div className={style}>
                <Icon path={mdiMapOutline} size={1} />
                <p>Map</p>
            </div>
            <div className={style}>
                <Icon path={mdiBookmarkOutline} size={1} />
                <p>Bookmarks</p>
            </div>
            <div className={style}>
                <Icon path={mdiHelpCircleOutline} size={1} />
                <p>Help Center</p>
            </div>
            

        </div>
     );
}
 
export default HomeSideBar;