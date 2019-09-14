const mongoose = require("mongoose");

let UserVehicleSchema = mongoose.Schema({
    user: String,
    vehicles: Array
});

const UserVehicle = mongoose.model('userVehicles', UserVehicleSchema);

module.exports = UserVehicle;
