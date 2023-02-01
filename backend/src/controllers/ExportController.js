const GcodeFile = require('../models/GcodeFile');

module.exports = {

    async store(req, res) {
        const { filename } = req.file;

        const gcodefile = await GcodeFile.create({
            gcodefile: filename,
        })

        return res.json(gcodefile);
    }

};