import React, { useState, createContext, useContext } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../FirebaseConfig/Firebase.Config";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    FacebookAuthProvider,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from "firebase/auth";
import googleIcon from "./icon/google_icon.png";
import facebookIcon from "./icon/facebook_icon.png";
import UserInfo from "../UserAccount/UserInfo";
import { LogInContext } from "../../App";

const Login = () => {
    const firebaseApp = initializeApp(firebaseConfig);
    const [loggedInUser, setLoggedInUser] = useContext(LogInContext);
    const auth = getAuth();
    const [user, setUser] = useState({
        isSignedIn: false,
        displayName: "",
        email: "",
        password: "",
        err: "",
    });
    const dataHandler = (event) => {
        const loginInfo = { ...user };
        loginInfo[event.target.id] = event.target.value;
        setUser(loginInfo);
    };
    const navigate = useNavigate;
    const location = useLocation();
    // const { state } = location.state || { from: navigate("/") };
    // ---> Email Sign In <---
    const emailLogInHandler = (event) => {
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((res) => {
                console.log(res);
                const { displayName, email } = res.user;
                const userInfo = { ...user };
                userInfo.isSignedIn = true;
                userInfo.displayName = displayName;
                userInfo.email = email;
                setUser(userInfo);
                setLoggedInUser(userInfo);
            })
            .catch((err) => {
                const errorMessage = { ...user };
                errorMessage.err = err.message;
                setUser(errorMessage);
            });
        event.preventDefault();
    };
    // ---> Google Sign In <---
    const googleProvider = new GoogleAuthProvider();
    const googleLogInHandler = (event) => {
        signInWithPopup(auth, googleProvider)
            .then((res) => {
                const { displayName, email } = res.user;
                const loggedInUserInfo = {
                    isSignedIn: true,
                    displayName: displayName,
                    email: email,
                };
                setUser(loggedInUserInfo);
                setLoggedInUser(loggedInUserInfo);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    // ---> Facebook Sign In <---
    const facebookProvider = new FacebookAuthProvider();
    const facebookLogInHandler = () => {
        signInWithPopup(auth, facebookProvider)
            .then((res) => {
                const { displayName, email } = res.user;
                const loggedInUserInfo = {
                    isSignedIn: true,
                    displayName: displayName,
                    email: email,
                };
                setUser(loggedInUserInfo);
                setLoggedInUser(loggedInUserInfo);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    // ---> Reset Password <---
    const resetPassword = (email) => {
        sendPasswordResetEmail(auth, email)
            .then((res) => {})
            .catch((err) => console.log(err.message));
    };
    return (
        <div>
            {loggedInUser.isSignedIn ? (
                <div className="loggedInPage">
                    {/* <h2>Hello, {user.name}</h2> */}
                    <Navigate to="/shipment" />
                </div>
            ) : (
                <div className="logInPage">
                    <div className="loginAddress col-md-3">
                        <form action="" onSubmit={emailLogInHandler}>
                            <div className="userLogin ">
                                <h3>User Login</h3>
                                <h3>
                                    Not a User?
                                    <Link to="/signup" className="signupBtn">
                                        {" "}
                                        Sign Up
                                    </Link>
                                </h3>
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="formInput col-md-12"
                                    onChange={dataHandler}
                                    placeholder="Enter your Email Address"
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="formInput col-md-12"
                                    onChange={dataHandler}
                                    placeholder="Enter your Password"
                                    required
                                />
                                <h6>{user.err}</h6>
                                <h5
                                    className="forgetPass"
                                    onClick={() => resetPassword(user.email)}
                                >
                                    Forget your Password?
                                </h5>
                                <input
                                    type="submit"
                                    name="submit"
                                    className="submit"
                                    id="submit"
                                    value="Log In"
                                />
                            </div>
                        </form>
                        <h3 className="or">OR</h3>
                    </div>
                    <div
                        className="googleButton col-md-3"
                        onClick={googleLogInHandler}
                    >
                        <img
                            src={googleIcon}
                            className="icon "
                            alt="google logo"
                        />
                        <h3>Log In With Google</h3>
                    </div>
                    <div
                        className="facebookButton col-md-3"
                        onClick={facebookLogInHandler}
                    >
                        <img
                            src={facebookIcon}
                            className="icon "
                            alt="google logo"
                        />
                        <h3>Log In With Facebook</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
