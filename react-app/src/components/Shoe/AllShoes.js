import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import * as shoeActions from "../../store/shoe";
import { getReviews, fetchDeleteReview } from "../../store/review";
import './shoes.css'


const Shoes = () => {
    // const user = useSelector((state) => state.session.user);
    const history = useHistory();
    const shoes = Object.values(useSelector((state) => state.shoe));
    const filterShoes = shoes.slice(0, 30)

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const reviewsObj = useSelector(state => state.review.allReviews)
    const [showMenu, setShowMenu] = useState(false);
    const [editId, setEditId] = useState(-1);
    const [reviewBody, setReviewBody] = useState("");



    useEffect(() => {
        dispatch(shoeActions.fetchAllShoes());
    }, [dispatch]);

    const openMenu = () => {
        if (!showMenu) setShowMenu(true);
        if (showMenu) setShowMenu(false);
    };

    const handleDelete = async (reviewId, shoeId) => {
        await dispatch(fetchDeleteReview(reviewId, shoeId))
        await dispatch(shoeActions.fetchAllShoes())
    };

    return (
        <div>
            <div className="shoe-feed">{filterShoes?.map((shoe) => (
                <div key={shoe.id}>
                    <div className="item-header3">
                        <div className="left">
                            <img
                                src={shoe?.img_url}
                                alt="Profile"
                                className="profileImage"
                            />
                        </div>
                        <div className="right">
                            <div className="caption-wrapper">
                                <NavLink className="caption" to={`/shoes/${shoe.id}`} exact={true}>{shoe.brand} {shoe.model}</NavLink>
                                <div>{shoe.type} ${shoe.price}</div>
                            </div>
                        </div>
                    </div>
                </div>))}</div>
        </div>
    );
};

export default Shoes;
