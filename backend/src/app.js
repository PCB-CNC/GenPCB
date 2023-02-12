import express from 'express';
import routes from './routes.js';
import cors from 'cors';
import fileUploaded from 'express-fileupload'
// import bodyParser from 'body-parser';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.text());
    this.server.use(express.urlencoded({ extended: true}))
    this.server.use(fileUploaded());
    // this.server.use(bodyParser.json({limit: '3000kb'}))
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;