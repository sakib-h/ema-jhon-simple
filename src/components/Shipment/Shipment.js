import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { LogInContext } from "../../App";
import "./Shipment.css";

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(LogInContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    console.log(watch("example"));

    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register("name", { required: true })}
                placeholder="Enter you Name"
                defaultValue={loggedInUser.name}
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
