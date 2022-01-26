import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { LogInContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import "./Shipment.css";

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(LogInContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        const savedCart = getDatabaseCart();
        const orderDetails = {
            ...loggedInUser,
            products: savedCart,
            shipment: data,
            orderTime: new Date(),
        };
        fetch(`http://localhost:5000/addOrder`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderDetails),
        })
            .then((res) => res.json())
            .then((data) => {
                processOrder()
            });
    };

    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register("name", { required: true })}
                placeholder="Enter you Name"
                defaultValue={loggedInUser.displayName}
            />
            {errors.name && <span className="error">Name is required</span>}

            <input
                {...register("email", { required: true })}
                placeholder="Enter you Name"
                defaultValue={loggedInUser.email}
            />
            {errors.email && <span className="error">Email is required</span>}

            <input
                {...register("address", { required: true })}
                placeholder="Enter you Address"
            />
            {errors.address && (
                <span className="error">Address is required</span>
            )}

            <input
                {...register("ZipCode", { required: true })}
                placeholder="Enter you Zip Code"
            />
            {errors.ZipCode && (
                <span className="error">ZipCode is required</span>
            )}

            <input
                {...register("phone", { required: true })}
                placeholder="Enter you Phone Number"
            />
            {errors.phone && (
                <span className="error">Phone Number is required</span>
            )}
            <input type="submit" />
        </form>
    );
};

export default Shipment;
