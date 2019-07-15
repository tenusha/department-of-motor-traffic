const express = require('express')
const router = express.Router()

router.get('/:vehicleNo', async (req, res) => {

    try {
        var vehicle = req.params.vehicleNo
        console.log(vehicle)
        license = {
            vehicle:vehicle,
            License_Issued_Date: "2018-12-01",
            Vehicle_Reg_No: "64-8693",
            License_Expiry_Date: "2019-11-30",
            License_No: "4471876"
        }
        res.status(200).json(license)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router