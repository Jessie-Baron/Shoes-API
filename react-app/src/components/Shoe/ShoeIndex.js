import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import * as shoeActions from "../../store/shoe";
import { fetchAllReviews, fetchDeleteReview } from "../../store/review";
import ReviewForm from "../Review/ReviewForm";
import ReviewEditForm from "../Review/ReviewEditForm";
import './shoes.css'




const Shoes = () => {

    const shoeId = Number(useLocation().pathname.split("/")[2]);
    const user = useSelector((state) => state.session.user);
    const shoes = Object.values(useSelector((state) => state.shoe));
    const shoe = shoes.filter(shoe => shoeId === shoe.id)[0]
    const dispatch = useDispatch();

    const [showEdit, setShowEdit] = useState(false);
    const [editId, setEditId] = useState(-1);
    const [reviewBody, setReviewBody] = useState("");
    const [rating, setRating] = useState(0);



    const handleDelete = async (reviewId, shoeId) => {
        await dispatch(fetchDeleteReview(reviewId, shoeId))
        await dispatch(shoeActions.fetchAllShoes())
    };

    return (
        <div className="indexContainer">
            <div className="left">
                <img
                    src={shoe?.img_url}
                    alt="Profile"
                    className="shoeImage"
                />
                            <div>
                brand: {shoe?.brand}
            </div>
            <div>
                model: {shoe?.model}
            </div>
            <div>
                type: {shoe?.type}
            </div>
            <div>
                size: {shoe?.size}
            </div>
            <div>
                color: {shoe?.color}
            </div>
            <div>
                material: {shoe?.material}
            </div>
            <div>
                price: ${shoe?.price}
            </div>
            </div>
            <div className="right">
                <div className="textarea-reviews">
                    <ReviewForm
                        shoeId={shoe?.id}
                        user_id={user?.id} />
                </div>
                {shoe?.Review.map((review) => (
                    <div className="review-wrapper2">
                        <div className="item-header">
                            <img
                                src={review.User.image_url}
                                alt="Profile"
                                className="reviewImage"
                            ></img>
                            <div>{review.User.username}</div>
                        </div>
                        <br />
                        <div className="review-body">{review.body}</div>
                        <div>rating: {review.rating}</div>
                        <br />
                        {review?.user_id === user?.id && (
                            <div className="review-buttons">
                                <div
                                    className="detailButton1"
                                    onClick={() => handleDelete(review.id, shoe.id)}
                                >
                                    <div className='delete-button'>Delete</div>
                                </div>
                                <div
                                    id={review.id}
                                    value={review.id}
                                    className="detailButton2"
                                    onClick={() => {
                                        if (editId === review.id) {
                                            setEditId(-1);
                                            setEditId("");
                                            return;
                                        }
                                        setEditId(review.id);
                                        setReviewBody(review.body);
                                    }}
                                >
                                    <div className='edit-button'>Edit</div>
                                </div>
                            </div>
                        )}
                        <div className="editform">
                            {editId === review.id && (
                                <ReviewEditForm
                                    className="review-edit-form"
                                    shoeId={shoe.id}
                                    review={review}
                                    setReviewBody={setReviewBody}
                                    reviewBody={reviewBody}
                                    setEditId={setEditId}
                                    setRating={setRating}
                                    rating={rating}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Shoes;
