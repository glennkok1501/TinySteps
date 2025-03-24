import { useState } from "react";
import { Modal } from "react-bootstrap";
import { mdiStar, mdiStarOutline } from "@mdi/js"; // MDI Icons for filled and outline stars
import Icon from "@mdi/react"; // MDI Icon component
import axios from "axios";

const ReviewBtn = ({setReviews, schoolId}) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [show, setShow] = useState(false);

    // Function to handle star click
    const handleStarClick = (starIndex) => {
        setRating(starIndex);
    };

    // Reset the form
    const reset = () => {
        setRating(0);
        setComment('');
    };

    // Handle modal close
    const handleClose = () => {
        reset();
        setShow(false);
    };

    const handleSubmit = () => {
        const body = {rating, comment, schoolId}

        axios.post(`${process.env.REACT_APP_API}/reviews?id=${schoolId}`, body, {withCredentials: true})
            .then((res) => {
                if (res.status === 200) {
                    setReviews((state) => [res.data, ...state])
                    handleClose()
                }
            })
    }

    return (
        <>
            <div onClick={() => setShow(true)} className="btn btn-secondary">
                Write a Review
            </div>

            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Write a Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h5>Rating</h5>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((starIndex) => (
                                <Icon
                                    key={starIndex}
                                    path={starIndex <= rating ? mdiStar : mdiStarOutline}
                                    size={2.5} // Adjust the size of the stars (bigger size)
                                    className="star"
                                    onClick={() => handleStarClick(starIndex)}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h5>Comment</h5>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="form-control"
                            rows="4"
                            placeholder="Leave your comment here..."
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button variant="secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button
                        variant="primary"
                        onClick={() => {
                            handleSubmit()
                        }}
                    >
                        Submit
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ReviewBtn;
