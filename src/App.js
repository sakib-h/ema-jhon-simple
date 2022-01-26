import React, { useState, createContext } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import { Routes, Route } from "react-router-dom";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import Error from "./components/Error/Error";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Login from "./components/Login/Login";
import Shipment from "./components/Shipment/Shipment";
import SignUp from "./components/SignUp/SignUp";
import UserInfo from "./components/UserAccount/UserInfo";
import PrivateOutlet from "./components/PrivateOutlet/PrivateOutlet";
export const LogInContext = createContext();
function App() {
    const [loggedInUser, setLoggedInUser] = useState({});
    return (
        <LogInContext.Provider value={[loggedInUser, setLoggedInUser]}>
            <Header></Header>
            <Routes>
                <Route path="/shop" element={<Shop />} />
                <Route path="/" element={<Shop />} />
                <Route path="/review" element={<Review />} />
                <Route
                    path="/product/:productKey"
                    element={<ProductDetail />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="" element={<PrivateOutlet />}>
                    <Route path="/shipment" element={<Shipment />} />
                    <Route path="/inventory" element={<Inventory />} />
                </Route>
                <Route path="/user" element={<UserInfo />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </LogInContext.Provider>
    );
}

export default App;
