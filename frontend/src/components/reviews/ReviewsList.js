import { useRef, useState, useEffect } from "react";
import ReviewView from "./ReviewView";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";
import ReviewBtn from "./ReviewBtn";

const ReviewsList = ({reviews, setReviews, allowReview, schoolId}) => {
    const scrollContainerRef = useRef(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);

    const checkScrollButtons = () => {
        const container = scrollContainerRef.current;
        if (container) {
            setShowLeftButton(container.scrollLeft > 0);
            setShowRightButton(
                container.scrollLeft < container.scrollWidth - container.clientWidth - 10
            );
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollButtons);
            // Initial check
            checkScrollButtons();
            // Check after images load
            window.addEventListener('load', checkScrollButtons);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScrollButtons);
                window.removeEventListener('load', checkScrollButtons);
            }
        };
    }, [reviews]);

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = container.clientWidth * 0.8;
            container.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return ( 
        <div className="reviews-section">
            <div className="reviews-header">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h3>Reviews</h3>
                        <span className="reviews-count">{reviews.length} Reviews</span>
                    </div>
                    {allowReview && <ReviewBtn setReviews={setReviews} schoolId={schoolId} />}
                </div>
            </div>
            <div className="reviews-container">
                <button 
                    className={`scroll-button left ${!showLeftButton ? 'hidden' : ''}`}
                    onClick={() => scroll(-1)}
                    aria-label="Scroll left"
                >
                    <Icon path={mdiChevronLeft} size={1.5} />
                </button>
                <div className="reviews-scroll" ref={scrollContainerRef}>
                    {reviews.map((review, index) => (
                        <ReviewView key={index} data={review} />
                    ))}
                </div>
                <button 
                    className={`scroll-button right ${!showRightButton ? 'hidden' : ''}`}
                    onClick={() => scroll(1)}
                    aria-label="Scroll right"
                >
                    <Icon path={mdiChevronRight} size={1.5} />
                </button>
            </div>
        </div>
    );
}
 
export default ReviewsList;