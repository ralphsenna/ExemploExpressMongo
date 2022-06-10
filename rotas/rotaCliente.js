import express from 'express';
import Cliente from '../modelo/cliente.js';
import ClienteDB from '../persistencia/clienteDB.js';

export const rotaCliente = express.Router();
rotaCliente.use(express.json());
rotaCliente.use(express.urlencoded({extended: true}));

const clienteDB = new ClienteDB();

rotaCliente.route('/:id?')
.get((req, resp) => {
    if (req.params.id) 
    {
        clienteDB.consultarClienteID(req.params.id).then(cliente => {
            if (cliente) 
            {
                resp.statusCode = 200;
                resp.setHeader('Content-Type', 'application/json');
                resp.json(cliente);
            }
            else
            {
                resp.statusCode = 404;
                resp.setHeader('Content-Type', 'application/json');
                resp.json({});
            }
        })
        
    }
    else
    {
        clienteDB.consultarClienteNome("").then(clientes => {
            resp.statusCode = 200;
            resp.setHeader('Content-Type', 'application/json');
            resp.json(clientes);
        });
    }
})

.post((req, resp) => {
    if (req.params.id) 
    {
        resp.end("Método Post não suportado utilizando o id " + req.params.id);
    }
    else
    {
        const dados = req.body;
        if (dados)
        {
            const cliente = new Cliente(0, dados.cpf, dados.nome, dados.dataNasc,
                                        dados.endereco, dados.bairro,
                                        dados.cidade, dados.uf);
            clienteDB.incluirCliente(cliente).then((id) => {
                resp.statusCode = 200;
                resp.setHeader('Content-Type', 'application/json');
                resp.json({"id":id});
            });
        }
    }
})

.put((req, resp) => {
    if (req.body) 
    {
        const dados = req.body;
        const cliente = new Cliente(dados.id, dados.cpf, dados.nome, dados.dataNasc,
                                    dados.endereco, dados.bairro,
                                    dados.cidade, dados.uf);
        clienteDB.atualizarCliente(cliente).then((resultado) => {
            resp.statusCode = 200;
            resp.setHeader('Content-Type', 'application/json');
            resp.json(resultado);
        })
    }
})

.delete((req, resp) => {
    if (req.body) 
    {
        const dados = req.body;
        const cliente = new Cliente(dados.id, dados.cpf, dados.nome, dados.dataNasc,
                                    dados.endereco, dados.bairro,
                                    dados.cidade, dados.uf);
        clienteDB.excluirCliente(cliente).then((resultado) => {
            resp.statusCode = 200;
            resp.setHeader('Content-Type', 'application/json');
            resp.json(resultado);
        })
    }
})