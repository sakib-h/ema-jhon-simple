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
    createUserWithEmailAndPassword,
} from "firebase/auth";
import "./SignUp.css";

const SignUp = () => {
    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth();
    const [user, setUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
        password: "",
        error: "",
        mailValidator: "",
        mailConfirmation: "",
        passwordConfirmation: "",
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
                // setUser(loggedInUser);
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
                // setUser(loggedInUser);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    let validEmail = true;
    let validPassword = true;
    let validationError;

    const dataHandler = (event) => {
        // ---> Valid Email <---
        if (event.target.id === "email") {
            validEmail = /\S+@\S+\.\S+/.test(event.target.value);
            if (validEmail === false) {
                validationError = "Please Enter a Valid Email Address";
            }
            const mailValidation = { ...user };
            mailValidation.mailConfirmation = validationError;
            setUser(mailValidation);
        }
        // ---> Valid Password <---
        if (event.target.id === "password") {
            validPassword =
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
                    event.target.value
                );
            if (validPassword === false) {
                validationError = "Please Enter a valid password";
            }
            const passwordValidation = { ...user };
            passwordValidation.passwordConfirmation = validationError;
            setUser(passwordValidation);
        }

        // ---> Confirm Email <---
        //   let confirmEmailAddress;
        //   let confirmationMessage;
        // const handleConfirmMail = (event) => {
        //     let confirmMailValue = false;
        //     const confirmMailAddress =
        //         event.target.id === "confirmEmail" && event.target.value;
        //     confirmMailValue = user.email === confirmMailAddress;
        //     if (confirmMailValue != true) {
        //         confirmMailValue = "Email Does not Match";
        //     }
        //     const handleMailConfirmation = {
        //         mailConfirmation: confirmMailValue,
        //     };
        //     setUser(handleMailConfirmation);
        // };

        const signUpHandler = () => {
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => console.log(err.message));
        };
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
                        onBlur={dataHandler}
                        className="formInput col-md-12"
                        placeholder="First Name"
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        onBlur={dataHandler}
                        className="formInput col-md-12"
                        placeholder="Last Name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={dataHandler}
                        className="formInput col-md-12"
                        placeholder="Enter your Email Address"
                        required
                    />
                    <h6> {user.mailConfirmation}</h6>
                    {/* <input
                        type="email"
                        name="confirmEmail"
                        id="confirmEmail"
                        onBlur={dataHandler}
                        className="formInput col-md-12"
                        placeholder="Confirm your Email Address"
                        required
                    />
                    <h6> {user.mailConfirmation}</h6> */}
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={dataHandler}
                        className="formInput col-md-12"
                        placeholder="Enter your Password"
                        required
                    />
                    <h6> {user.passwordConfirmation}</h6>
                    {/* <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        onBlur={dataHandler}
                        className="formInput col-md-12"
                        placeholder="Confirm your Password"
                        required
                    /> */}
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
