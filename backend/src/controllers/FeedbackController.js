const Feedback = require('../models/Feedback');

module.exports = {

    async show(req, res) {

        const working = true;
        const feedbackProcess = await Feedback.find( { working })

        return res.json(feedbackProcess);
    }

};