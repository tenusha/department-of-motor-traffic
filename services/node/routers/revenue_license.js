const express = require('express')
const router = express.Router()
const cars = require('../model/cars.json')
const Vehicles = require('../model/vehicle')

router.get('/:vehicleNo', async (req, res) => {

    try {
        const vehicle = req.params.vehicleNo
        var vehicleObj = await Vehicles.findOne({ vehicle }).exec()

        if (vehicleObj) {
            const license = {
                vehicle: vehicleObj.vehicle,
                Vehicle_Reg_No: vehicleObj.Vehicle_Reg_No,
                License_Issued_Date: vehicleObj.License_Issued_Date,
                License_Expiry_Date: vehicleObj.License_Expiry_Date,
                License_No: vehicleObj.License_No
            }
            res.status(200).json(license)

        } else {
            var expDateObj = randomDate(new Date(2019, 0, 1), new Date())
            var issueDateObj = new Date(expDateObj)
            issueDateObj.setDate(issueDateObj.getDate() - 1)

            var month = ((issueDateObj.getMonth() + 1) < 10 ? '0' : '') + (issueDateObj.getMonth() + 1)
            var date = ((issueDateObj.getDate()) < 10 ? '0' : '') + (issueDateObj.getDate())

            const issue = (issueDateObj.getFullYear() - 1) + "-" + month + "-" + date;

            month = ((expDateObj.getMonth() + 1) < 10 ? '0' : '') + (expDateObj.getMonth() + 1)
            date = (expDateObj.getDate() < 10 ? '0' : '') + (expDateObj.getDate())

            const exp = expDateObj.getFullYear() + "-" + month + "-" + date;

            const indx = Math.floor(Math.random() * cars.length)
            var make_and_model = cars[indx].make + " " + cars[indx].model
            var vehicleMod = new Vehicles({
                vehicle,
                License_Issued_Date: issue,
                Vehicle_Reg_No: vehicle,
                License_Expiry_Date: exp,
                License_No: Math.floor(Math.random() * 9000000) + 1000000,
                make_and_model,
                model_year: cars[indx].year,
                body_type: cars[indx].body_styles[0],
                fines: getRandomInt(4)
            })

            await vehicleMod.save()

            const license = {
                vehicle: vehicleMod.vehicle,
                Vehicle_Reg_No: vehicleMod.Vehicle_Reg_No,
                License_Issued_Date: vehicleMod.License_Issued_Date,
                License_Expiry_Date: vehicleMod.License_Expiry_Date,
                License_No: vehicleMod.License_No
            }
            res.status(200).json(license)
        }

    } catch (err) {
        res.status(500).json(err)
    }
});

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = router