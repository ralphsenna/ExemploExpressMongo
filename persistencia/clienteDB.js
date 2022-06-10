import {MongoClient, ObjectId} from "mongodb";
import Cliente from "../modelo/cliente.js";

const uri = "mongodb://localhost:27017";
const basedados = "CaiadoDB";
const colecao = "Clientes";

export default class ClienteDB
{
    constructor()
    {
        this.cliente = new MongoClient(uri);
    }

    async incluirCliente(clientes)
    {
        if (clientes instanceof Cliente)
        {
            try 
            {
                await this.cliente.connect();
                const resultado = await this.cliente.db(basedados).collection(colecao).insertOne({"cpf":clientes.cpf,
                                                                                                  "nome":clientes.nome,
                                                                                                  "dataNasc":clientes.dataNasc,
                                                                                                  "endereco":clientes.endereco,
                                                                                                  "bairro":clientes.bairro,
                                                                                                  "cidade":clientes.cidade,
                                                                                                  "uf":clientes.uf});
                clientes.id = resultado.insertedId.toString();
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

    async consultarClienteID(id)
    {
        try 
        {
            await this.cliente.connect();
            const objId = new ObjectId(id);
            const resultado = await this.cliente.db(basedados).collection(colecao).findOne({"_id":objId});
            if (resultado)
            {
                const clientes = new Cliente(resultado._id, resultado.cpf, resultado.nome,
                                             resultado.dataNasc, resultado.endereco, 
                                             resultado.bairro, resultado.cidade, resultado.uf);
                return clientes;
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

    async consultarClienteNome(nome)
    {
        try 
        {
            await this.cliente.connect();
            const cursor = this.cliente.db(basedados).collection(colecao).find({"nome":{"$regex":nome}});
            const resultados = await cursor.toArray();
            let listaClientes = [];
            if (resultados)
            {
                resultados.forEach(resultado => {
                    const clientes = new Cliente(resultado._id, resultado.cpf, resultado.nome,
                                                resultado.dataNasc, resultado.endereco, 
                                                resultado.bairro, resultado.cidade, resultado.uf);
                    listaClientes.push(clientes);
                });
                return listaClientes;
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

    async atualizarCliente(clientes)
    {
        if (clientes instanceof Cliente)
        {
            try 
            {
                await this.cliente.connect();
                const objId = new ObjectId(clientes.id);
                const resultado = await this.cliente.db(basedados).collection(colecao).updateOne({"_id":objId}, {"$set":clientes.toJSON()});
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

    async excluirCliente(clientes)
    {
        if (clientes instanceof Cliente)
        {
            try 
            {
                await this.cliente.connect();
                const objId = new ObjectId(clientes.id);
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