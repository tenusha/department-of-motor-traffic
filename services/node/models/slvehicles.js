const mongoose = require("mongoose");

let slvehiclesSchema = mongoose.Schema({
    vehicleNumber: String,
    vehicleOwner: String,
    engineNumber: String,
    class: String,
    manufacture: String,
    model: String,
    year:Number
});

const SLVehicles = mongoose.model('SLVehicles', slvehiclesSchema);

module.exports = SLVehicles;