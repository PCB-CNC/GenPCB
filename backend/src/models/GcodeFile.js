const mongoose = require('mongoose');

const GcodeFileSchema = new mongoose.Schema({
    gcodefile: String,
});

module.exports = mongoose.model('GcodeFile', GcodeFileSchema);