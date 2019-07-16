const express = require('express')
const router = express.Router()

router.get('/:vehicleNo', async (req, res) => {

    try {
        const vehicle = req.params.vehicleNo

        var expDateObj = randomDate(new Date(2019, 0, 1), new Date())
        var issueDateObj = new Date(expDateObj)
        issueDateObj.setDate(issueDateObj.getDate() - 1)
        
        var month = ((issueDateObj.getMonth() + 1) < 10 ? '0' : '') + (issueDateObj.getMonth() + 1)
        var date = ((issueDateObj.getDate()) < 10 ? '0' : '') + (issueDateObj.getDate())

		const issue = (issueDateObj.getFullYear() - 1) + "-" + month + "-" + date;

		month = ((expDateObj.getMonth() + 1) < 10 ? '0' : '') + (expDateObj.getMonth() + 1)
        date = (expDateObj.getDate() < 10 ? '0' : '') + (expDateObj.getDate())

		const exp = expDateObj.getFullYear() + "-" + month + "-" + date;

        license = {
            vehicle:vehicle,
            License_Issued_Date: issue,
            Vehicle_Reg_No: vehicle,
            License_Expiry_Date: exp,
            License_No: Math.floor(Math.random()*9000000) + 1000000
        }

        res.status(200).json(license)

    } catch (err) {
        res.status(500).json(err)
    }
});

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = router