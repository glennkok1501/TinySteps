import axios from "axios";
import { useEffect, useState } from "react";
import ReviewsList from "./ReviewsList";
import { useSelector } from "react-redux";

const ReviewSection = ({schoolId}) => {
    const [reviews, setReviews] = useState([]);
    const [allowReview, setAllowReview] = useState(true);
    const user = useSelector(state => state.user.value).payload;

    // Function to check if user has already reviewed
    const checkUserReview = (reviewsList) => {
        return !reviewsList.some(review => review.userId._id === user._id);
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/reviews?id=${schoolId}`, {withCredentials: true})
            .then((res) => {
                if (res.status === 200) {
                    setReviews(res.data);
                    setAllowReview(checkUserReview(res.data));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [schoolId, user._id]);

    // Custom setReviews function that also updates allowReview
    const handleSetReviews = (newReviews) => {
        if (typeof newReviews === 'function') {
            setReviews(prevReviews => {
                const updatedReviews = newReviews(prevReviews);
                setAllowReview(checkUserReview(updatedReviews));
                return updatedReviews;
            });
        } else {
            setReviews(newReviews);
            setAllowReview(checkUserReview(newReviews));
        }
    };
    
    return (
        <ReviewsList 
            reviews={reviews} 
            setReviews={handleSetReviews} 
            allowReview={allowReview}
            schoolId={schoolId}
        />
    );
}
 
export default ReviewSection;