const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")
const SlVehicles = require("../models/slvehicles")


router.get("/:vehicleNo", (req, res) => {

    const query = {vehicleNumber: req.params.vehicleNo}
    try {
        SlVehicles.find(query, (err, vehicle) => {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            } else {
                res.status(200).json(vehicle);
            }
        });

    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router;