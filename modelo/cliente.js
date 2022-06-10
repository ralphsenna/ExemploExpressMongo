export default class Cliente
{
    #id;
    #cpf;
    #nome;
    #dataNasc;
    #endereco;
    #bairro;
    #cidade;
    #uf;

    constructor(id, cpf, nome, dataNasc, endereco, bairro, cidade, uf)
    {
        this.#id = id;
        this.#cpf = cpf;
        this.#nome = nome;
        this.#dataNasc = dataNasc;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
    }

    get id()
    {
        return this.#id
    }
    set id(novoid)
    {
        this.#id = novoid;
    }

    get cpf()
    {
        return this.#cpf
    }
    set cpf(cpfnovo)
    {
        if (!isNaN(cpfnovo))
        {
            this.#cpf = cpfnovo;
        }
    }

    get nome()
    {
        return this.#nome
    }
    set nome(nomenovo)
    {
        this.#nome = nomenovo;
    }

    get dataNasc()
    {
        return this.#dataNasc
    }
    set dataNasc(data)
    {
        this.#dataNasc = data;
    }

    get endereco()
    {
        return this.#endereco
    }
    set endereco(endereconovo)
    {
        this.#endereco = endereconovo;
    }

    get bairro()
    {
        return this.#bairro
    }
    set bairro(bairronovo)
    {
        this.#bairro = bairronovo;
    }

    get cidade()
    {
        return this.#cidade
    }
    set cidade(cidadenova)
    {
        this.#cidade = cidadenova;
    }

    get uf()
    {
        return this.#uf
    }
    set uf(ufnovo)
    {
        this.#uf = ufnovo;
    }

    toJSON()
    {
        return{
            "id": this.#id,
            "cpf": this.#cpf,
            "nome": this.#nome,
            "dataNasc": this.#dataNasc, 
            "endereco": this.#endereco,
            "bairro": this.#bairro,
            "cidade": this.#cidade,
            "uf": this.#uf
        }
    }
}