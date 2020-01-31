const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

mongoose.connect(
  'mongodb+srv://bia-omnistack-10:omnistack@cluster0-zr6zt.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(routes);

/*

Query Params: request.query (filtros, ordenação, paginação)
Route Params: request.params (identificar um recurso na alteração e remoção)
Body: request.body (Dados para criação ou alteração de um registro)

MongoDB: Banco não-relacional
*/

app.listen(3333);
