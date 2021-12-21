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

    let validEmail = true;
    let confirmEmailAddress = true;
    let validPassword = true;
    let confirmPassword = true;
    let emailAddress;
    let userPassword;
    let validationError;

    const dataHandler = (event) => {
        // ---> Valid Email <---
        if (event.target.id === "email") {
            validEmail = /\S+@\S+\.\S+/.test(event.target.value);
            if (validEmail === false) {
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
            }
            const mailValidation = { ...user };
            mailValidation.mailConfirmationMessage = validationError;
            setUser(mailValidation);
        }

        if (event.target.id === "password") {
            // ---> Valid Password <---
            validPassword =
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
                    event.target.value
                );
            if (validPassword === false) {
                validationError = "Please Enter a valid password";
            } else {
                userPassword = event.target.value;
            }
            const passwordValidation = { ...user };
            passwordValidation.passwordValidationMessage = validationError;
            passwordValidation.password = userPassword;
            setUser(passwordValidation);
            // ---> Confirm Password <---
          
        }
          if (event.target.id === "confirmPassword") {
              confirmPassword = user.password === event.target.value;
              if (confirmPassword === false) {
                  validationError = "Password does not Match";
              }
              console.log(validationError);
              const passwordValidation = { ...user };
              passwordValidation.passwordConfirmationMessage = validationError;
              setUser(passwordValidation);
          }

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
                        type="button"
                        name="button"
                        className="button"
                        id="button"
                        value="Create a New Account"
                    />
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
