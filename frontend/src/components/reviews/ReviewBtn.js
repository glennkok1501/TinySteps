import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { mdiStar, mdiStarOutline } from "@mdi/js"; // MDI Icons for filled and outline stars
import Icon from "@mdi/react"; // MDI Icon component
import axios from "axios";

const ReviewBtn = ({setReviews, schoolId}) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [show, setShow] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Create a cancel token source
        const cancelTokenSource = axios.CancelToken.source();

        return () => {
            // Cancel any ongoing requests when component unmounts
            cancelTokenSource.cancel('Component unmounted');
        };
    }, []);

    // Function to handle star click
    const handleStarClick = (starIndex) => {
        setRating(starIndex);
    };

    // Reset the form
    const reset = () => {
        setRating(0);
        setComment('');
        setIsSubmitting(false);
    };

    // Handle modal close
    const handleClose = () => {
        reset();
        setShow(false);
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;
        
        setIsSubmitting(true);
        const cancelTokenSource = axios.CancelToken.source();

        try {
            const body = {rating, comment, schoolId};
            const res = await axios.post(
                `${process.env.REACT_APP_API}/reviews?id=${schoolId}`, 
                body, 
                {
                    withCredentials: true,
                    cancelToken: cancelTokenSource.token
                }
            );

            if (res.status === 200) {
                setReviews(prevReviews => [res.data, ...prevReviews]);
                handleClose();
            }
        } catch (err) {
            if (!axios.isCancel(err)) {
                console.error("Error submitting review:", err);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button 
                onClick={() => setShow(true)} 
                className="btn btn-primary mb-4"
                style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.75rem',
                    fontWeight: '500',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}
            >
                <Icon path={mdiStar} size={1.2} />
                Write a Review
            </button>

            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Write a Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-4">
                        <h5 className="mb-3">Rating</h5>
                        <div className="star-rating" style={{ gap: '0.5rem' }}>
                            {[1, 2, 3, 4, 5].map((starIndex) => (
                                <Icon
                                    key={starIndex}
                                    path={starIndex <= rating ? mdiStar : mdiStarOutline}
                                    size={2}
                                    className="star"
                                    onClick={() => handleStarClick(starIndex)}
                                    style={{ cursor: 'pointer', color: starIndex <= rating ? '#ffc107' : '#adb5bd' }}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h5 className="mb-3">Comment</h5>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="form-control"
                            rows="4"
                            placeholder="Share your experience with this preschool..."
                            style={{
                                borderRadius: '0.75rem',
                                border: '2px solid #dee2e6',
                                padding: '1rem'
                            }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button 
                        className="btn btn-secondary" 
                        onClick={handleClose}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.75rem',
                            fontWeight: '500'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={!rating || !comment.trim() || isSubmitting}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.75rem',
                            fontWeight: '500'
                        }}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ReviewBtn;
