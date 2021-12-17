import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import { Routes, Route, Link } from "react-router-dom";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import Error from "./components/Error/Error";
import ProductDetail from "./components/ProductDetail/ProductDetail";
function App() {
    return (
        <div>
            <Header></Header>

            <Routes>
                <Route path="/shop" element={<Shop></Shop>} />

                <Route path="/review" element={<Review></Review>} />
                <Route path="/inventory" element={<Inventory></Inventory>} />
                <Route exact path="/" element={<Shop></Shop>} />
                <Route
                    path="/product/:productKey"
                    element={<ProductDetail></ProductDetail>}
                />
                <Route path="*" element={<Error></Error>} />
            </Routes>
        </div>
    );
}

export default App;
