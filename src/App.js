import React from "react";
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
function App() {
    return (
        <div>
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
                <Route path="/shipment" element={<Shipment></Shipment>} />
                <Route path="/user" element={<UserInfo></UserInfo>} />
                <Route exact path="/" element={<Shop></Shop>} />
                <Route path="*" element={<Error></Error>} />
            </Routes>
        </div>
    );
}

export default App;
