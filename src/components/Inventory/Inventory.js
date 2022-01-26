import React from "react"; 

const Inventory = () => {
    const handleAddProduct = () => {
        const product = {};
        // Post Data to server
        fetch(`http://localhost:5000/addProduct`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
    };
    return (
        <div>
            <form action="">
                <p>
                    <span>
                        Name: <input type="text" />
                    </span>
                </p>
                <p>
                    <span>
                        Price: <input type="text" />
                    </span>
                </p>
                <p>
                    <span>
                        Quantity: <input type="text" />
                    </span>
                </p>
                <p>
                    <span>
                        Product Image: <input type="file" />
                    </span>
                </p>
                <button onClick={handleAddProduct}>Add Product</button>
            </form>
        </div>
    );
};

export default Inventory;
