const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://lucasgomes:1234@pi2-backend.qnxcqll.mongodb.net/?retryWrites=true&w=majority');

app.use(express.json());
app.use(routes);
// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar corpo da requisição (para criação, edição)


app.listen(3334);