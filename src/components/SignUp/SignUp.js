import React, { useState } from "react";
import facebookIcon from "../Login/icon/facebook_icon.png";
import googleIcon from "../Login/icon/google_icon.png";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../FirebaseConfig/Firebase.Config";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    FacebookAuthProvider,
    signInWithEmailAndPassword,
} from "firebase/auth";
import "./SignUp.css";
const SignUp = () => {
    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth();
    const [user, setUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
    });
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
            <div className="signUpAddress col-md-3">
                <form action="">
                    <div className="userLogin ">
                        <h3>Sign Up for New Account</h3>
                    </div>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="formInput col-md-12"
                        placeholder="First Name"
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="formInput col-md-12"
                        placeholder="Last Name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="formInput col-md-12"
                        placeholder="Enter your Email Address"
                        required
                    />
                    <input
                        type="email"
                        name="confirmEmail"
                        id="confirmEmail"
                        className="formInput col-md-12"
                        placeholder="Confirm your Email Address"
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
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className="formInput col-md-12"
                        placeholder="Confirm your Password"
                        required
                    />
                    <input
                        type="button"
                        name="button"
                        className="button"
                        id="button"
                        value="Create a New Account"
                    />
                </form>
                <h3>OR</h3>
            </div>
            <div className="googleButton col-md-3" onClick={googleLogInHandler}>
                <img src={googleIcon} className="icon " alt="google logo" />
                <h3>Continue With Google</h3>
            </div>
            <div
                className="facebookButton col-md-3"
                onClick={facebookLogInHandler}
            >
                <img src={facebookIcon} className="icon " alt="google logo" />
                <h3>Continue In With Facebook</h3>
            </div>
        </div>
    );
};

export default SignUp;
