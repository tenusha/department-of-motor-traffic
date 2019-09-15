const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")
const Fines = require("../models/fines")


router.get("/", (req, res) => {

    const query = {}
    try {
        Fines.find(query, (err, fine) => {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            } else {
                res.status(200).json(fine);
            }
        });

    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router;