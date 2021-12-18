import React, { useContext } from "react";
import { UserContext } from "../Login/Login";
import "./UserInfo.css";

const UserInfo = (event) => {
    const [user, setUser] = useContext(UserContext);
    const { name, email, isSignedIn } = user;
    const handleSignOut = () => {
        const user = {
            isSignedIn: false,
            name: "",
            email: "",
        };
        setUser(user);
    };

    return (
        <div className="userInfo">
            <h2>Hello, {name}</h2>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default UserInfo;
