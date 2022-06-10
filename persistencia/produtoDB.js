import {MongoClient, ObjectId} from "mongodb";
import Produto from "../modelo/produto.js";

const uri = "mongodb://localhost:27017";
const basedados = "CaiadoDB";
const colecao = "Produtos";

export default class ProdutoDB
{
    constructor()
    {
        this.cliente = new MongoClient(uri);
    }

    async incluirProduto(produto)
    {
        if (produto instanceof Produto)
        {
            try 
            {
                await this.cliente.connect();
                const resultado = await this.cliente.db(basedados).collection(colecao).insertOne({"descricao":produto.descricao,
                                                                                                  "qtdEstoque":produto.qtdEstoque,
                                                                                                  "precoCusto":produto.precoCusto,
                                                                                                  "precoVenda":produto.precoVenda});
                produto.id = resultado.insertedId.toString();
                return resultado.insertedId.toString();
            }catch(e) 
            {
                console.error(e);
            }
            finally
            {
                this.cliente.close();
            }
        }
    }

    async consultarProdutoID(id)
    {
        try 
        {
            await this.cliente.connect();
            const objId = new ObjectId(id);
            const resultado = await this.cliente.db(basedados).collection(colecao).findOne({"_id":objId});
            if (resultado)
            {
                const produto = new Produto(resultado._id, resultado.descricao, resultado.qtdEstoque,
                                            resultado.precoCusto, resultado.precoVenda);
                return produto;
            }
        }catch(e) 
        {
            console.error(e);
        }
        finally
        {
            this.cliente.close();
        }
    }

    async consultarProdutoDescricao(descricao)
    {
        try 
        {
            await this.cliente.connect();
            const cursor = this.cliente.db(basedados).collection(colecao).find({"descricao":{"$regex":descricao}});
            const resultados = await cursor.toArray();
            let listaProdutos = [];
            if (resultados)
            {
                resultados.forEach(resultado => {
                    const produto = new Produto(resultado._id, resultado.descricao, resultado.qtdEstoque,
                                                resultado.precoCusto, resultado.precoVenda);
                    listaProdutos.push(produto);
                });
                return listaProdutos;
            }
            
        }catch(e) 
        {
            console.error(e);
        }
        finally
        {
            this.cliente.close();
        }
    }

    async atualizarProduto(produto)
    {
        if (produto instanceof Produto)
        {
            try 
            {
                await this.cliente.connect();
                const objId = new ObjectId(produto.id);
                const resultado = await this.cliente.db(basedados).collection(colecao).updateOne({"_id":objId}, {"$set":produto.toJSON()});
                                                                                                 //{seletor}   |      {novos dados}
                if (resultado.modifiedCount > 0)
                {
                    return{
                        "resultado":true
                    }
                }
                else
                {
                    return{
                        "resultado":false
                    }
                }
            }catch(e) 
            {
                console.error(e);
            }
            finally
            {
                this.cliente.close();
            }
        }
    }

    async excluirProduto(produto)
    {
        if (produto instanceof Produto)
        {
            try 
            {
                await this.cliente.connect();
                const objId = new ObjectId(produto.id);
                const resultado = await this.cliente.db(basedados).collection(colecao).deleteOne({"_id":objId});
                if (resultado.deletedCount > 0)
                {
                    return{
                        "resultado":true
                    }
                }
                else
                {
                    return{
                        "resultado":false
                    }
                }
            }catch(e) 
            {
                console.error(e);
            }
            finally
            {
                this.cliente.close();
            }
        }
    }
}