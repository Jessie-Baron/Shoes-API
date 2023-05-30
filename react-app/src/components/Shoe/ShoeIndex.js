import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import * as shoeActions from "../../store/shoe";
import { fetchAllReviews, fetchDeleteReview } from "../../store/review";
import ReviewForm from "../Review/ReviewForm";
import ReviewEditForm from "../Review/ReviewEditForm";
import './shoes.css'
import ShoeEditForm from "./ShoeEditForm";




const Shoes = () => {

    const shoeId = Number(useLocation().pathname.split("/")[2]);
    const user = useSelector((state) => state.session.user);
    const shoes = Object.values(useSelector((state) => state.shoe));
    const shoe = shoes.filter(shoe => shoeId === shoe.id)[0]
    const dispatch = useDispatch();
    const history = useHistory()

    const [showEdit, setShowEdit] = useState(false);
    const [editId, setEditId] = useState(-1);
    const [editId2, setEditId2] = useState(-1);
    const [reviewBody, setReviewBody] = useState("");
    const [rating, setRating] = useState(0);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState("");
    const [type, setType] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [material, setMaterial] = useState("");
    const [price, setPrice] = useState('');

    // const deleteShoe = async () => {
    //     await dispatch(shoeActions.fetchDeleteShoe(shoe.id))
    //         .then(history.push(`/`))
    // };

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
                <br />
                <div onClick={shoeActions.fetchDeleteShoe(shoe?.id)} className="delete-button">
                    Delete
                </div>
                <div className="edit-button"
                                                id={shoe?.id}
                                                value={shoe?.id}
                                                onClick={() => {
                                                    if (editId2 === shoe?.id) {
                                                        setEditId2(-1);
                                                        setEditId2("");
                                                        return;
                                                    }
                                                    setShowEdit(!showEdit)
                                                    setEditId2(shoe.id);
                                                    setBrand(shoe.brand);
                                                    setModel(shoe.model);
                                                    setType(shoe.type);
                                                    setSize(shoe.size);
                                                    setColor(shoe.color);
                                                    setMaterial(shoe.material);
                                                    setPrice(shoe.price);
                                                }}>
                                                Edit
                                            </div>
                                            <div className="editform">
                                        {showEdit && (
                                            <ShoeEditForm
                                                className="caption-edit-form"
                                                shoeId={shoe.id}
                                                setBrand={setBrand}
                                                brand={brand}
                                                setModel={setModel}
                                                model={model}
                                                setType={setType}
                                                type={type}
                                                setSize={setSize}
                                                size={size}
                                                setColor={setColor}
                                                color={color}
                                                setMaterial={setMaterial}
                                                material={material}
                                                setPrice={setPrice}
                                                price={price}
                                                setShowEdit={setShowEdit}
                                            />
                                        )}
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
