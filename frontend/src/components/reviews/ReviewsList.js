import ReviewView from "./ReviewView";

const ReviewsList = ({reviews, setReviews}) => {

    return ( 
        <div>
            <p>{`${reviews.length} Reviews`}</p>
            {
                reviews.map((r, index) => (
                    <div key={index}>
                        <ReviewView data={r} />
                    </div>
                ))
            }
        </div>
     );
}
 
export default ReviewsList;