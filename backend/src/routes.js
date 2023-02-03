import { Router } from 'express';

const routes = new Router();

routes.post('/fileString', (req, res) => {
  // const { fileString } = req.body
  
  return res.json( req.body );
});

export default routes;