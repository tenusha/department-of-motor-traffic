const mongoose = require("mongoose");

let finesSchema = mongoose.Schema({
    lno: String,
    ref: Number,
    vehicleNumber: String,
    finedDate: String,
    finedPlace: String,
    fineDueDate: String,
    reason: String,
    status: String,
    amount: Number
});

const Fines = mongoose.model('Fines', finesSchema);

module.exports = Fines;