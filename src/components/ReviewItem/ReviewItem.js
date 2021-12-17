import React from "react";
import "./ReviewItem.css";

const ReviewItem = (props) => {
    console.log(props.product);
    const { name, quantity, key, seller, img, price } = props.product;

    return (
        <div className="review-item">
            <div className="productImage">
                <img src={img} alt={name} />
            </div>
            <div className="productDetails">
                <h4 className="product-info ">{name}</h4>
                <p>Quantity: {quantity}</p>
                <p>By: {seller}</p>
                <h3>${price}</h3>
                <button
                    onClick={() => props.removeProduct(key)}
                    className="button-cart"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default ReviewItem;
