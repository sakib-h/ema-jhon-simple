import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import "./Header.css";
import { LogInContext } from "../../App";
import Login from "../Login/Login";
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(LogInContext);
    const { name } = loggedInUser;
    const handleSignOut = () => {
        const user = {
            isSignedIn: false,
            name: "",
            email: "",
        };
        setLoggedInUser(user);
    };

    return (
        <div className="header">
            <img src={logo} alt="ema-john" />
            <nav className="navigation ">
                <div className="userInfo">
                    {loggedInUser.isSignedIn ? (
                        <div className="navButton">
                            <Link to="/shop">Shop</Link>
                            <Link to="/review">Review</Link>
                            <Link to="/inventory">Manage Inventory</Link>
                            <Link to="/user">{name}</Link>
                            <Link
                                to="/"
                                onClick={handleSignOut}
                                className="signInOutButton"
                            >
                                Sign Out
                            </Link>
                        </div>
                    ) : (
                        <div className="navButton">
                            <Link to="/shop">Shop</Link>
                            <Link to="/review">Review</Link>
                            <Link to="/inventory">Manage Inventory</Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Header;
