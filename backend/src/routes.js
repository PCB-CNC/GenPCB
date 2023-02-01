const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const ExportController = require('./controllers/ExportController');
const FeedbackController = require('./controllers/FeedbackController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/', FeedbackController.show);
routes.post('/export', upload.single('gcodefile'), ExportController.store);

module.exports = routes;