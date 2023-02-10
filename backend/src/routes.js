import { Router } from 'express';

const routes = new Router();

routes.post('/file', (req, res) => {
  // const { fileString } = req.body
    return res.json(req.body);
});

routes.get('/feedback', (req, res) => {
    return res.json(res);
});

export default routes;