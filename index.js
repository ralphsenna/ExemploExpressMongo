import express from 'express'; 
import http from 'http';
import {rotaProduto} from './rotas/rotaProduto.js';
import {rotaCliente} from './rotas/rotaCliente.js';

const hostname = 'localhost';
const porta = 3000;

const app = express();

app.use('/produtos', rotaProduto);
app.use('/clientes', rotaCliente)

const servidor = http.createServer(app);
servidor.listen(porta, hostname, () => {
    console.log("Servidor escutando em " + hostname + ":" + porta);
});