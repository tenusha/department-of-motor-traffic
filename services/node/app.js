'use strict'
const express = require('express')
const app = express()
const revenue_license = require('./routers/revenue_license')
const user_vehicles = require('./routers/user_vehicles')
const slvehicle_details = require('./routers/slvehicle_details')
const mongoose = require("mongoose");

// DB Connection
mongoose.connect("mongodb://localhost:27017/DMT", { useUnifiedTopology: true  })

let db = mongoose.connection;

db.on("error", (err) => {
    console.log(err);
});

db.once("open", () => {
    console.log("Connected to MongoDB");
});


app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use("/revenueLicense",revenue_license)
app.use("/users",user_vehicles)
app.use("/slvehicles",slvehicle_details)

app.listen(3001, err => {
    if (err) {
        console.error(err)
        return
    }
    console.log('app listening on port 3001')
});