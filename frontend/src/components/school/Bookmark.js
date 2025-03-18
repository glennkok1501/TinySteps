import { mdiBookmark, mdiBookmarkOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useDispatch } from "react-redux";
import { bookmarkSchool } from "../../features/school/schoolSlice";
import axios from "axios";

const Bookmark = ({schoolId, marked}) => {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        axios.post(`${process.env.REACT_APP_API}/schools/bookmark`, { schoolId: schoolId }, {headers: { 'Content-Type': 'application/json'}, withCredentials: true })
            .then((res) => {
                if (res.status === 200) {
                    
                    if (res.data) {
                        dispatch(bookmarkSchool(schoolId)); // Dispatch the action to toggle bookmark status
                    }
                }
            })
    };

    return ( 
        <div onClick={onClickHandler}>
            <Icon path={marked ? mdiBookmark : mdiBookmarkOutline} size={1.5} color="black" />
        </div>
     );
}
 
export default Bookmark;