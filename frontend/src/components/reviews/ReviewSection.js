import axios from "axios";
import { useEffect, useState } from "react";
import ReviewBtn from "./ReviewBtn";
import ReviewsList from "./ReviewsList";
import { useSelector } from "react-redux";

const ReviewSection = ({schoolId}) => {
    const [reviews, setReviews] = useState([])
    const [allowReview, setAllowReview] = useState(true)
    const user = useSelector(state => state.user.value).payload

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/reviews?id=${schoolId}`, {withCredentials: true})
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data)
                    setReviews(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [schoolId])

    useEffect(() => {
        for (var i = 0; i < reviews.length; i++) {
        
            if (reviews[i].userId._id === user._id) {
                setAllowReview(false)
                return
            }
        }
        setAllowReview(true)

    }, [reviews])

    
    return ( 
        <>
        {allowReview && <ReviewBtn setReviews={setReviews} schoolId={schoolId} />}
        <ReviewsList reviews={reviews} setReviews={setReviews} />
        </>
     );
}
 
export default ReviewSection;