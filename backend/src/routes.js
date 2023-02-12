import { Router } from 'express';
import { convertToPng, convertToGcode } from './conversionMethods.js';
<<<<<<< HEAD
import util from 'util';
import {mkdir, rm} from 'fs/promises';
=======
import path from 'path';
import util from 'util';
import fs, {mkdir, rm} from 'fs/promises';
>>>>>>> 868363f57614495bd7312a0e28ef56ccbd2ae874
const routes = new Router();

routes.post('/file', async (req, res) => {
  return res.json(req.body);
});

routes.post('/convertFileToGcode', async (req, res) => {
  await rm('./tmp', {recursive: true}); // remove pasta temporaria temp 
  mkdir('./tmp'); // cria pasta temporaria tmp

  const file = req.files.filename //dados do arquivo selecionado enviado nesta rota 
  
  const fileName = file.name // nome do arquivo
  const urlToSave = "./tmp/" + fileName // diretorio de salvamento do aquivo
  
  await util.promisify(file.mv)(urlToSave) // salva arquivo selecionado na pasta tmp

  await convertToPng("tmp/" + fileName) 

  convertToGcode()

  return res.json({message: "File conversion successfully completed!"}); // retornar string do arquivo gerber
});

routes.get('/feedback', (req, res) => {
  return res.json(res);
});

export default routes;