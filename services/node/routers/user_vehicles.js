const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")
const cars = require('../model/cars.json')
const Vehicles = require('../model/vehicle')
const UserVehicle = require('../model/userVehicle')
const Subscription = require('../model/subscription')

router.get('/:user/vehicles', async (req, res) => {

    try {
        const user = req.params.user
        var vehicles = await UserVehicle.findOne({ user }).exec()
        if (vehicles) {
            res.status(200).json(vehicles.vehicles)
        } else {
            res.status(200).json([])
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/:vehicleNo', async (req, res) => {

    try {

        const vehicle = req.params.vehicleNo
        var vehicleObj = await Vehicles.findOne({ vehicle }).exec()

        if (vehicleObj) {
            res.status(200).json(vehicleObj)
        } else {

            const vehicleMod = await createVehicle(vehicle, cars).save()

            res.status(200).json(vehicleMod)
        }

    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/:user/vehicles/:vno', async (req, res) => {

    try {
        const user = req.params.user
        const vno = req.params.vno

        const vehicles = await UserVehicle.findOne({ user }).exec()

        if (vehicles) {
            var index = vehicles.vehicles.indexOf(vno)
            if (index > -1) {
                vehicles.vehicles.splice(index, 1);
            }

            await vehicles.save()
        }

        res.status(200).json({ success: true })

    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/:uid/vehicles/', async (req, res) => {

    try {
        const user = req.params.uid

        const vehicles = await UserVehicle.findOne({ user }).exec()

        if (vehicles) {
            var index = vehicles.vehicles.indexOf(req.body.vehicle)
            if (!(index > -1)) {
                vehicles.vehicles = [...vehicles.vehicles, req.body.vehicle]
                await vehicles.save()
            }
        } else {
            await new UserVehicle({
                user,
                vehicles: [req.body.vehicle]
            }).save()
        }

        res.status(200).json({ success: true })

    } catch (err) {
        res.status(500).json(err)
    }
});


//Notification service
router.post('/push-token', async (req, res) => {
    try {
        var subscriptions = await Subscription.findOne({ "user.id": req.body.user.id }).exec()
        if (subscriptions) {
            subscriptions.token = { ...subscriptions.token, ...req.body.token }
            subscriptions.user = { ...subscriptions.user, ...req.body.user }
            await subscriptions.save()
            res.status(200).json({ success: true })
        } else {
            await new Subscription({ ...req.body }).save()
            res.status(200).json({ success: true })
        }

    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/notifications/push-token', async (req, res) => {
    try {
        var subscriptions = await Subscription.find().exec()
        res.status(200).json(subscriptions)

    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/:id/notify', async (req, res) => {

    try {
        const userId = req.params.id
        const vehicles = await UserVehicle.findOne({ user: userId }).exec()
        var subscriptions = await Subscription.findOne({ "user.id": userId }).exec()

        var token = subscriptions.token.value


        if (token && (vehicles.vehicles.length > 0)) {
            return fetch("https://exp.host/--/api/v2/push/send", {
                method: 'POST',
                body: JSON.stringify({
                    to: token,
                    sound: "default",
                    body: "Your revenue licence of vehicle " + vehicles.vehicles[0] + " is ending soon. Click here to see more details."
                }),
                headers: { "Content-Type": "application/json" }
            })
                .then(response =>
                    res.status(200).json({ success: true })
                ).catch(err => {
                    console.log(err)
                    res.status(500).json(err)
                })
        } else {
            res.status(404).json({ success: false })
        }

    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/:id/notify/:vno', async (req, res) => {

    try {
        const userId = req.params.id
        const vno = String(req.params.vno)
        const vehicles = await UserVehicle.findOne({ user: userId }).exec()
        var subscriptions = await Subscription.findOne({ "user.id": userId }).exec()

        var token = subscriptions.token.value
        var index = vehicles.vehicles.indexOf(vno)

        if (token && (vehicles.vehicles.length > 0) && index > -1) {
            return fetch("https://exp.host/--/api/v2/push/send", {
                method: 'POST',
                body: JSON.stringify({
                    to: token,
                    sound: "default",
                    body: "Your revenue licence of vehicle " + vno + " is ending soon. Click here to see more details."
                }),
                headers: { "Content-Type": "application/json" }
            })
                .then(response =>
                    res.status(200).json({ success: true })
                ).catch(err => {
                    console.log(err)
                    res.status(500).json(err)
                })
        } else {
            res.status(404).json({ success: false })
        }

    } catch (err) {
        res.status(500).json(err)
    }
});

handleErrors = response => {
    if (!response.ok) {
        throw new Error("Request failed " + response.statusText)
    }
    return response
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function createVehicle(vehicle, cars) {
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
    return vehicleMod
}

module.exports = router