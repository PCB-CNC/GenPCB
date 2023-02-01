const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    porcent: String,
    working: Boolean
});

module.exports = mongoose.model('Feedback', FeedbackSchema);