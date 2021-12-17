import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import Product from "../Product/Product";
import "./Shop.css";
import Cart from "../Cart/Cart";
import {
    addToDatabaseCart,
    getDatabaseCart,
} from "../../utilities/databaseManager";
import { Link } from "react-router-dom";

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

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

    const handleAddProduct = (product) => {
        const toBeAddKey = product.key;
        const sameProduct = cart.find((pd) => pd.key === toBeAddKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter((pd) => pd.key !== toBeAddKey);
            newCart = [...others, sameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    };

    return (
        <div className="shop-container">
            <div className="product-container">
                {products.map((product) => (
                    <Product
                        key={product.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={product}
                    ></Product>
                ))}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="button-cart">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
