import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import * as purchaseActions from "../../store/purchase";
import './purchase.css'

const Purchases = () => {

    const purchases = Object.values(useSelector((state) => state.purchase));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(purchaseActions.fetchAllPurchase());
    }, [dispatch]);

    return (
        <>
            <center>
                <div className='purchasesFeed'>{purchases?.map((purchase) => (
                    <div className='purchaseItem'>
                        <div className="purchaseColumn">{purchase.id + 1}</div>
                        <div className="purchaseColumn">{purchase.name}</div>
                        <div className="purchaseColumn">{purchase.date_of_purchase}</div>
                        <div className="purchaseColumn">{purchase.shoe_id}</div>
                        <div className="purchaseColumn5">{purchase.User.first_name} {purchase.User.last_name}</div>
                    </div>
                ))}

                </div>
            </center>
        </>
    )
}

export default Purchases;
