import React, { useState, createContext } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import { Routes, Route, Link } from "react-router-dom";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import Error from "./components/Error/Error";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Login from "./components/Login/Login";
import Shipment from "./components/Shipment/Shipment";
import SignUp from "./components/SignUp/SignUp";
import UserInfo from "./components/UserAccount/UserInfo";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
export const LogInContext = createContext();
function App() {
    const [loggedInUser, setLoggedInUser] = useState({});
    return (
        <LogInContext.Provider value={[loggedInUser, setLoggedInUser]}>
            <Header></Header>
            <Routes>
                <Route path="/shop" element={<Shop></Shop>} />
                <Route path="/review" element={<Review></Review>} />
                <Route path="/inventory" element={<Inventory></Inventory>} />
                <Route
                    path="/product/:productKey"
                    element={<ProductDetail></ProductDetail>}
                />
                <Route path="/login" element={<Login></Login>} />
                <Route path="/signup" element={<SignUp></SignUp>} />
                <Route
                    path="/shipment"
                    element={
                        <PrivateRoute redirectTo="/login">
                            <Shipment></Shipment>
                        </PrivateRoute>
                    }
                />
                <Route path="/user" element={<UserInfo></UserInfo>} />
                <Route exact path="/" element={<Shop></Shop>} />
                <Route path="*" element={<Error></Error>} />
            </Routes>
        </LogInContext.Provider>
    );
}

export default App;
