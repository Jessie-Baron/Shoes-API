import { useState, useEffect } from "react";
import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { fetchPostReview } from "../../store/review"
import * as shoeActions from "../../store/shoe";
import './review.css'


function ReviewForm(shoeId) {
    const user = useSelector((state) => state.session.user);
    const id = (Object.values(shoeId)[0])
    const [body, setBody] = useState("");
    const [rating, setRating] = useState(0);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (!body) {
            setValidationErrors([]);
            return;
        }
        const errors = [];
        if (!body.length) errors.push("Please enter your review");
    }, [body]);

    const onSubmit = async (e) => {
        // Prevent the default form behavior so the page doesn't reload.
        e.preventDefault();
        setHasSubmitted(true);

        // Create a new object for the review form information.
        const reviewForm = {
            body,
            rating: Number(rating),
            user_id: user.id,
            shoe_id: id,
        };

        await dispatch(fetchPostReview(reviewForm))
        await dispatch(shoeActions.fetchAllShoes())

        // Reset the form state.
        setBody("");
        setRating(0);
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
            {user && <label>
                <textarea
                    className="reviewArea"
                    type="text"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required={true}
                />
            </label>}
            <br />
            {user &&
                <select name="rating" id="rating-dropdown" onChange={(e) => setRating(e.target.value)} value={rating}>
                    <option value='0'>0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>}
                {user && <button className={!body || body.length > 1000 ? 'review-button' : 'review-button-active'} disabled={!body || body.length > 1000} type="submit">Respond</button>}
                {!user && <div className="review-signin-wrapper"><NavLink to='/' className="signin-text-reviews">Please log in to review</NavLink></div>}
            </form>
  );
}

            export default ReviewForm;
