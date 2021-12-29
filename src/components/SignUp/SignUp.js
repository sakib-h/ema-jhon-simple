import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    updateProfile,
} from "firebase/auth";
import "./SignUp.css";

const SignUp = () => {
    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth();
    const [user, setUser] = useState({
        isSignedIn: false,
        firstName: "",
        lastName: "",
        displayName: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
        photo: "",
        err: "",
        mailValidationMessage: "",
        mailConfirmationMessage: "",
        passwordValidationMessage: "",
        passwordConfirmationMessage: "",
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

    let formValid = true;
    let confirmEmailAddress = true;
    let confirmPassword = true;
    let confirmEmailAddressValue;
    let confirmPasswordValue;
    let emailAddress;
    let userPassword;
    let validationError;

    // ---> Data Handler <---
    const dataHandler = (event) => {
        // name handler
        if (event.target.id === "firstName") {
            const firstUserName = event.target.value;
            const userName = { ...user };
            userName.firstName = firstUserName;
            setUser(userName);
        }
        if (event.target.id === "lastName") {
            const lastUserName = event.target.value;
            const userName = { ...user };
            userName.lastName = lastUserName;
            setUser(userName);
        }

        // ---> Valid Email <---
        if (event.target.id === "email") {
            formValid = /\S+@\S+\.\S+/.test(event.target.value);
            if (formValid === false) {
                validationError = "Please Enter a Valid Email Address";
            } else {
                emailAddress = event.target.value;
            }
            const mailValidation = { ...user };
            mailValidation.mailValidationMessage = validationError;
            mailValidation.email = emailAddress;
            setUser(mailValidation);
        }
        // ---> Confirm Email <---
        if (event.target.id === "confirmEmail") {
            confirmEmailAddress = user.email === event.target.value;
            if (confirmEmailAddress === false) {
                validationError = "Email address does not Match";
            } else {
                confirmEmailAddressValue = event.target.value;
            }
            const mailValidation = { ...user };
            mailValidation.mailConfirmationMessage = validationError;
            mailValidation.confirmEmail = confirmEmailAddressValue;
            setUser(mailValidation);
        }

        // ---> Valid Password <---
        if (event.target.id === "password") {
            formValid =
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
                    event.target.value
                );
            if (formValid === false) {
                validationError = "Please Enter a valid password";
            } else {
                userPassword = event.target.value;
            }
            const passwordValidation = { ...user };
            passwordValidation.passwordValidationMessage = validationError;
            passwordValidation.password = userPassword;
            setUser(passwordValidation);
        }

        // ---> Confirm Password <---
        if (event.target.id === "confirmPassword") {
            confirmPassword = user.password === event.target.value;
            if (confirmPassword === false) {
                validationError = "Password does not Match";
            } else {
                confirmPasswordValue = event.target.value;
            }
            const passwordValidation = { ...user };
            passwordValidation.passwordConfirmationMessage = validationError;
            passwordValidation.confirmPassword = confirmPasswordValue;
            setUser(passwordValidation);
        }
    };
    // ---> Submit Handler <---
    const handleSubmit = (event) => {
        if (user.confirmEmail && user.confirmPassword) {
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((res) => {
                    const signedUpUser = {
                        isSignedIn: true,
                    };
                    setUser(signedUpUser);
                    updateProfile(auth.currentUser, {
                        displayName: user.firstName + " " + user.lastName,
                    })
                        .then((res) => {
                            // console.log("Profile Updated");
                        })
                        .catch((error) => {
                            // An error occurred
                            // ...
                        });
                })
                .catch((err) => {
                    const errorMessage = { ...user };
                    errorMessage.err = `Email is Already in use. Please try to login into your Account;`;
                    setUser(errorMessage);
                });
        }
        event.preventDefault();
    };

    return (
        <div>
            <div className="signUpAddress col-md-3">
                <form action="" onSubmit={handleSubmit}>
                    <div className="userLogin ">
                        <h3>Sign Up for New Account</h3>
                        <h3>
                            Already a User?
                            <Link to="/login"> Login</Link>
                        </h3>
                    </div>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        onChange={dataHandler}
                        className="formInput col-md-12"
                        placeholder="First Name"
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        onChange={dataHandler}
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
                    <h6> {user.mailValidationMessage}</h6>
                    <input
                        type="email"
                        name="confirmEmail"
                        id="confirmEmail"
                        onChange={dataHandler}
                        className="formInput col-md-12"
                        placeholder="Confirm your Email Address"
                        required
                    />
                    <h6> {user.mailConfirmationMessage}</h6>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={dataHandler}
                        className="formInput col-md-12"
                        placeholder="Enter your Password"
                        required
                    />
                    <h6> {user.passwordValidationMessage}</h6>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        onChange={dataHandler}
                        className="formInput col-md-12"
                        placeholder="Confirm your Password"
                        required
                    />
                    <h6> {user.passwordConfirmationMessage}</h6>
                    <input
                        type="submit"
                        name="submit"
                        className="submit"
                        id="submit"
                        value="Create a New Account"
                    />
                    <h6> {user.err}</h6>
                </form>
                <h3 className="or">OR</h3>
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
