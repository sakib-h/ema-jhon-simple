import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Product = (props) => {
    const { img, name, seller, price, stock, key } = props.product;
    return (
        <div className="product">
            <div className="image col-md-3">
                <img src={img} alt={name} title={name} />
            </div>
            <div className="product-info">
                <h4>
                    <Link to={"/product/" + key}>{name}</Link>
                </h4>

                <br />
                <p>
                    <small>by: {seller}</small>
                </p>
                <p className="price">${price}</p>
                <p>
                    <small>Only {stock} left in stock - Order Now</small>
                </p>
                {props.showAddToCart && (
                    <button
                        className="button-cart"
                        onClick={() => props.handleAddProduct(props.product)}
                    >
                        {" "}
                        <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default Product;
