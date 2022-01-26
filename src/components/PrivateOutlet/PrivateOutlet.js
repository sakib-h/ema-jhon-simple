import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LogInContext } from "../../App";

const PrivateOutlet = () => {
    const [loggedInUser, setLoggedInUser] = useContext(LogInContext);
    return loggedInUser.isSignedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateOutlet;
