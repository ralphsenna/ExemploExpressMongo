import express from 'express';
import Produto from '../modelo/produto.js';
import ProdutoDB from '../persistencia/produtoDB.js';

export const rotaProduto = express.Router();
rotaProduto.use(express.json());
rotaProduto.use(express.urlencoded({extended: true}));

const produtoDB = new ProdutoDB();

rotaProduto.route('/:id?')
.get((req, resp) => {
    if (req.params.id) 
    {
        produtoDB.consultarProdutoID(req.params.id).then(produto => {
            if (produto) 
            {
                resp.statusCode = 200;
                resp.setHeader('Content-Type', 'application/json');
                resp.json(produto);
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
        produtoDB.consultarProdutoDescricao("").then(produtos => {
            resp.statusCode = 200;
            resp.setHeader('Content-Type', 'application/json');
            resp.json(produtos);
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
            const produto = new Produto(dados.id, dados.descricao, dados.qtdEstoque,
                                        dados.precoCusto, dados.precoVenda);
            produtoDB.incluirProduto(produto).then((id) => {
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
        const produto = new Produto(dados.id, dados.descricao, dados.qtdEstoque,
                                    dados.precoCusto, dados.precoVenda);
        produtoDB.atualizarProduto(produto).then((resultado) => {
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
        const produto = new Produto(dados.id, dados.descricao, dados.qtdEstoque,
                                    dados.precoCusto, dados.precoVenda);
        produtoDB.excluirProduto(produto).then((resultado) => {
            resp.statusCode = 200;
            resp.setHeader('Content-Type', 'application/json');
            resp.json(resultado);
        })
    }
})