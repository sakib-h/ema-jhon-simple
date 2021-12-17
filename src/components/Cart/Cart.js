import React from "react";

const cart = (props) => {
    const cart = props.cart;

    // ----->> USING REDUCE <<-----
    // const totalPrice = cart.reduce(
    //     (total, product) => total + product.price,
    //     0
    // );
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }
    let shipping = 0;
    if (total > 200) {
        shipping = 0;
    } else if (total > 20) {
        shipping = 12.99;
    } else if (total > 0) {
        shipping = 4.99;
    }
    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);
    return (
        <div>
            <h3>Order Summary</h3>
            <h5>Items Ordered {cart.length}</h5>
            <p>Item Price {total.toFixed(2)}</p>
            <p>
                <small>Shipping Cost: {shipping}</small>
            </p>
            <p>
                <small>Tax+VAT: {tax}</small>
            </p>
            <p>Total Price = {grandTotal}</p>
            {props.children}
        </div>
    );
};

export default cart;
