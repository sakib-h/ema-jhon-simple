import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LogInContext } from "../../App";
import "./UserInfo.css";

const UserInfo = (event) => {
    const [loggedInUser, setLoggedInUser] = useContext(LogInContext);
    const { name, email, isSignedIn } = loggedInUser;


    return (
        <div>
            {isSignedIn ? (
                <div className="userInfo">
                    <h2>Hello, {name}</h2>
                    <h3>Your Email address is, {email}</h3>
                </div>
            ) : (
                <Navigate to="/" />
            )}
        </div>
    );
};

export default UserInfo;
