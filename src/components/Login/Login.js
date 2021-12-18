import React, { useState, createContext } from "react";
import "./Login.css";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../FirebaseConfig/Firebase.Config";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    FacebookAuthProvider,
    signInWithEmailAndPassword,
} from "firebase/auth";
import googleIcon from "./icon/google_icon.png";
import facebookIcon from "./icon/facebook_icon.png";
import UserInfo from "../UserAccount/UserInfo";
export const UserContext = createContext();
const Login = () => {
    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth();
    const [user, setUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
    });
    // ---> Email Sign In <---

    // const emailLogInHandler = () => {
    //     signInWithEmailAndPassword(auth, email, password)
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .then((err) => {
    //             console.log(err.message);
    //         });
    // };
    // ---> Google Sign In <---
    const googleProvider = new GoogleAuthProvider();
    const googleLogInHandler = (event) => {
        signInWithPopup(auth, googleProvider)
            .then((res) => {
                const { displayName, email } = res.user;
                const loggedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                };
                setUser(loggedInUser);
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
                const loggedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                };
                setUser(loggedInUser);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <div>
            {user.isSignedIn ? (
                <div className="loggedInPage">
                    {/* <h2>Hello, {user.name}</h2> */}
                    <UserContext.Provider value={[user, setUser]}>
                        <UserInfo></UserInfo>
                    </UserContext.Provider>
                </div>
            ) : (
                <div className="logInPage">
                    <div className="loginAddress col-md-3">
                        <form action="">
                            <div className="userLogin ">
                                <h3>User Login</h3>
                                <h3>
                                    Not a User? <a href="/signup"> Sign Up</a>
                                </h3>
                            </div>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="formInput col-md-12"
                                placeholder="Enter your Email Address"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="formInput col-md-12"
                                placeholder="Enter your Password"
                                required
                            />
                            <a href="#" className="forgetPass">
                                Forget your Password?
                            </a>
                            <input
                                type="button"
                                name="button"
                                className="button"
                                // onClick={emailLogInHandler}
                                id="button"
                                value="Log In"
                            />
                        </form>
                        <h3>OR</h3>
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
