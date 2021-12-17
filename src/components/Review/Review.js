import React, { useEffect, useState } from "react";
import {
    getDatabaseCart,
    processOrder,
    removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import fakeData from "../../fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import "./Review.css";
import happyImage from "../../images/giphy.gif";

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    };

    const removeProduct = (productKey) => {
        const newCart = cart.filter((pd) => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cardProducts = productKeys.map((key) => {
            const product = fakeData.find((pd) => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cardProducts);
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
                    <button onClick={handlePlaceOrder} className="button-cart">
                        Place Order
                    </button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
