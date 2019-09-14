const mongoose = require("mongoose");

let SubscriptionsSchema = mongoose.Schema({
    token: Object,
    user: Object
});

const Subscription = mongoose.model('subscriptions', SubscriptionsSchema);

module.exports = Subscription;
