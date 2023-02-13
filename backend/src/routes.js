import { Router } from 'express';
import { convertToPng, convertToGcode } from './conversionMethods.js';
import util from 'util';
import {mkdir, rm} from 'fs/promises';
const routes = new Router();
import fs from 'fs'

routes.post('/file', async (req, res) => {
  return res.json(req.body);
});

routes.post('/convertFileToGcode', async (req, res) => {
  
  if(!fs.existsSync('./tmp')) { 
     mkdir('./tmp'); // cria pasta temporária temp caso não exista
  }
  
  const file = req.files.filename //dados do arquivo selecionado enviado nesta rota 
  
  const fileName = file.name // nome do arquivo
  const urlToSave = "./tmp/" + fileName // diretorio de salvamento do aquivo
  
  await util.promisify(file.mv)(urlToSave) // salva arquivo selecionado na pasta tmp
  
  await convertToPng("tmp/" + fileName) 
  
  convertToGcode()
  
  await rm('./tmp', {recursive: true}); // remove pasta temporaria temp 
  
  return res.json({message: "File conversion successfully completed!"}); // retornar string do arquivo gerber
});

routes.get('/feedback', (req, res) => {
  return res.json(res);
});

export default routes;