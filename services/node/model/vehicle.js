const mongoose = require("mongoose");

let vehiclesSchema = mongoose.Schema({
    vehicle: String,    
    Vehicle_Reg_No: String,
    make_and_model: String,
    model_year: String,
    body_type: String,
    License_No: Number,
    License_Issued_Date: String,
    License_Expiry_Date: String,
    License_No: Number,
    fines: Number
});

const Vehicles = mongoose.model('vehicles', vehiclesSchema);

module.exports = Vehicles;
