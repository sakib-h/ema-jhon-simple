import React, { useEffect, useState, useContext } from "react";
import {
    getDatabaseCart,
    processOrder,
    removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import "./Review.css";
import happyImage from "../../images/giphy.gif";
import { useNavigate } from "react-router-dom";
import { LogInContext } from "../../App";

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useContext(LogInContext);
    const handleCheckout = () => {
        navigate("/shipment");
    };

    const removeProduct = (productKey) => {
        const newCart = cart.filter((pd) => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch(`http://localhost:5000/productsByKeys`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productKeys),
        })
            .then((res) => res.json())
            .then((data) => setCart(data));
    }, []);
    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt="" />;
    }

    return (
        <div className="reviewContainer">
            <div className="productInfo">
                {cart.map((product) => (
                    <ReviewItem
                        key={product.key}
                        product={product}
                        removeProduct={removeProduct}
                    ></ReviewItem>
                ))}
                {thankYou}
            </div>
            <div className="cart">
                <Cart cart={cart}>
                    <button onClick={handleCheckout} className="button-cart">
                        Proceed Checkout
                    </button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
