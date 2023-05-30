import { useState, useEffect } from "react";
import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { fetchEditReview } from "../../store/review";
import * as shoeActions from "../../store/shoe";

function ReviewEditForm({ review, setReviewBody, reviewBody, setEditId, shoeId, rating, setRating }) {

    const userId = useSelector((state) => state.session.user.id);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        if (!reviewBody) {
            setValidationErrors([]);
            return;
        }
        console.log("uE running");
        const errors = [];
        if (!reviewBody.length) errors.push("Please enter your review");
    }, [reviewBody]);

    const onSubmit = async (e) => {
        // Prevent the default form behavior so the page doesn't reload.
        e.preventDefault();

        setHasSubmitted(true);
        if (validationErrors.length) return alert(`Cannot Submit`);

        // Create a new object for the song form information.
        const reviewForm = {
            body: reviewBody,
            rating: Number(rating),
            shoe_id: shoeId,
            id: review.id
        };


        await dispatch(fetchEditReview(reviewForm))
        await dispatch(shoeActions.fetchAllShoes())
        setEditId(-1)


        // Reset the form state.
        setReviewBody("");
        setValidationErrors([]);
        setHasSubmitted(false);
    };

    return (
        <form id="form1" noValidate onSubmit={onSubmit}>
            <ul>
                {validationErrors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <label>
                <textarea
                    className="edit-text"
                    id="edit-form-text"
                    type="text"
                    value={reviewBody}
                    onChange={(e) => setReviewBody(e.target.value)}
                    required
                />
            </label>
            <select name="rating" id="rating-dropdown" onChange={(e) => setRating(e.target.value)} value={rating}>
                <option value='0'>0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button className='review-button' type="submit">Respond</button>
        </form >
    );
}

export default ReviewEditForm;
