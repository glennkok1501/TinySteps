import { mdiStar } from "@mdi/js";
import Icon from "@mdi/react";

const ReviewView = ({data}) => {
    // Format date
    const reviewDate = new Date(data.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return ( 
        <div className="review-card">
            <div className="review-header">
                <div className="reviewer-info">
                    <p className="reviewer-name">{data.userId.username}</p>
                    <span className="reviewer-email">{data.userId.email}</span>
                </div>
            </div>
            <div className="review-rating">
                {[...Array(5)].map((_, index) => (
                    <Icon
                        key={index}
                        path={mdiStar}
                        size={1}
                        className={`star ${index < data.rating ? 'text-warning' : 'text-muted'}`}
                    />
                ))}
            </div>
            <div className="review-content-wrapper">
                <p className="review-content">{data.comment}</p>
                <span className="review-date">{reviewDate}</span>
            </div>
        </div>
    );
}
 
export default ReviewView;