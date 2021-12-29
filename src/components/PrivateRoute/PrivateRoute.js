import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LogInContext } from "../../App";

const PrivateRoute = ({ children, redirectTo }) => {
    const [loggedInUser, setLoggedInUser] = useContext(LogInContext);
    return loggedInUser.isSignedIn ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
