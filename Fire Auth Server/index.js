const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lfa2u.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 5000;

app.get(`/`, (req, res) => {
    res.send("Hello from DB it's working");
});

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
client.connect((err) => {
    const productsCollection = client.db("EmaJohnStore").collection("Products");
    const ordersCollection = client.db("EmaJohnStore").collection("Orders");
    // Add Product data
    app.post(`/addProduct`, (req, res) => {
        const product = req.body;
        productsCollection.insertOne(product).then((result) => {
            res.send(result.insertedCount);
            console.log(result.insertedCount);
        });
    });
    // Add Order data
    app.post(`/addOrder`, (req, res) => {
        const order = req.body;
        ordersCollection.insertOne(order).then((result) => {
            res.send(result);
        });
    });

    // Load/Read all Product from server
    app.get("/products", (req, res) => {
        productsCollection
            .find({})
            // .limit(20)
            .toArray((err, documents) => {
                res.send(documents);
            });
    });

    // Load single product
    app.get("/product/:key", (req, res) => {
        productsCollection
            .find({ key: req.params.key })
            .toArray((err, document) => {
                res.send(document[0]);
            });
    });

    // Get selected product only
    app.post(`/productsByKeys`, (req, res) => {
        const productKeys = req.body;
        productsCollection
            .find({ key: { $in: productKeys } })
            .toArray((err, documents) => {
                res.send(documents);
            });
    });
});

app.listen(process.env.PORT || port);
