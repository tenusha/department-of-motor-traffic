const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")

var userVehicles=[
	{id:"1",vehicles:["64-8693", "CAA 4902", "KK-3439"]},
	{id:"2",vehicles:["12-8693", "AAA 4359", "KL-1039"]},
	{id:"3",vehicles:["300-8693", "CAE 4430", "LL-1459"]}
]

var makeAndModel=["Toyota prius", "Susuki Wagon-R", "Honda Vezel", "TATA Nano", "Toyota Corolla", "Toyota Aqua", "Toyota Axio", "Susuki Maruti", "BMW X5"];

var modelYear=["2004", "2005", "2006", "2007", "2008", "2009", "2019", "2018", "2017", "2016","2015", "2013"];

var subscriptions = []

router.get('/:uid/vehicles', async (req, res) => {

    try {
        const userId = req.params.uid
        var vehicles = userVehicles.find(item => item.id == userId).vehicles
        res.status(200).json(vehicles)

    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/:vno', async (req, res) => {

    try {
        var expDateObj = randomDate(new Date(2019, 0, 1), new Date())
        var issueDateObj = new Date(expDateObj)
        issueDateObj.setDate(issueDateObj.getDate() - 1)
        
        var month = ((issueDateObj.getMonth() + 1) < 10 ? '0' : '') + (issueDateObj.getMonth() + 1)
        var date = ((issueDateObj.getDate()) < 10 ? '0' : '') + (issueDateObj.getDate())

		const issue = (issueDateObj.getFullYear() - 1) + "-" + month + "-" + date;

		month = ((expDateObj.getMonth() + 1) < 10 ? '0' : '') + (expDateObj.getMonth() + 1)
        date = (expDateObj.getDate() < 10 ? '0' : '') + (expDateObj.getDate())

		const exp = expDateObj.getFullYear() + "-" + month + "-" + date;

        var vehicle = {
            vehicle:req.params.vno,
            License_Issued_Date: issue,
            Vehicle_Reg_No: req.params.vno,
            License_Expiry_Date: exp,
            License_No: Math.floor(Math.random()*9000000) + 1000000,
			make_and_model: makeAndModel[Math.floor(Math.random()*makeAndModel.length)],
			model_year: modelYear[Math.floor(Math.random()*modelYear.length)],
			fines: getRandomInt(4)
        }
		
        res.status(200).json(vehicle)

    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/:uid/vehicles/:vno', async (req, res) => {

    try {
        const userId = req.params.uid
        const vno = req.params.vno

        for (var i in userVehicles) {
        	if(userVehicles[i].id == userId){
				var index = userVehicles[i].vehicles.indexOf(vno)
				if (index > -1) {
					userVehicles[i].vehicles.splice(index, 1);
				}
        	}           		   	
     	}
        res.status(200).json({success:true})

    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/:uid/vehicles/', async (req, res) => {

    try {
        const userId = req.params.uid

        for (var i in userVehicles) {
        	if(userVehicles[i].id == userId){
				userVehicles[i].vehicles = [...userVehicles[i].vehicles, req.body.vehicle]
        	}           		   	
     	}

        res.status(200).json({success:true})

    } catch (err) {
        res.status(500).json(err)
    }
});


//Notification service
router.post('/push-token', async (req, res) => {

    try {
        subscriptions.push(req.body)
        console.log(req.body)
        res.status(200).json({success:true})

    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/:id/notify', async (req, res) => {

    try {
    	const userId = req.params.id
    	var vehicles = []
    	var token = ""
        
        for (var i in userVehicles) {
        	if(userVehicles[i].id == userId){
				vehicles = userVehicles[i].vehicles
        	}           		   	
     	}


     	for (var j in subscriptions) {
        	if(subscriptions[j].user.id == userId){
				token = subscriptions[j].token.value
				console.log(token)
        	}           		   	
     	}
     		

     	if(token && (vehicles.length > 0)){
     		return fetch("https://exp.host/--/api/v2/push/send",{
     			method: 'POST',
        		body: JSON.stringify({
				  to: token,
				  sound: "default",
				  body: "Your revenue licence of vehicle " + vehicles[0] + " is ending soon. Click here to see more details."
        		}),
        		headers: { "Content-Type": "application/json" }
     		})
            .then(response => 
            	res.status(200).json({success:true})
            ).catch(err => {
                console.log(err)
                res.status(500).json(err)
            })			
     	}else{
     		res.status(404).json({success:false})
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

module.exports = router