export default class Produto
{
    #id;
    #descricao;
    #qtdEstoque;
    #precoCusto;
    #precoVenda;

    constructor(id, descricao, qtdEstoque, precoCusto, precoVenda)
    {
        this.#id = id;
        this.#descricao = descricao;
        this.#qtdEstoque = qtdEstoque;
        this.#precoCusto = precoCusto;
        this.#precoVenda = precoVenda;
    }

    get id()
    {
        return this.#id
    }
    set id(novoid)
    {
        this.#id = novoid;
    }

    get descricao()
    {
        return this.#descricao
    }
    set descricao(desc)
    {
        this.#descricao = desc;
    }

    get qtdEstoque()
    {
        return this.#qtdEstoque
    }
    set qtdEstoque(qtd)
    {
        if (!isNaN(qtd))
        {
            this.#qtdEstoque = qtd;
        }
    }

    get precoCusto()
    {
        return this.#precoCusto
    }
    set precoCusto(preco)
    {
        if (!isNaN(preco))
        {
            this.#precoCusto = preco;
        }
    }

    get precoVenda()
    {
        return this.#precoVenda
    }
    set precoVenda(preco)
    {
        if (!isNaN(preco))
        {
            this.#precoVenda = preco;
        }
    }

    toJSON()
    {
        return{
            "id": this.#id,
            "descricao": this.#descricao,
            "qtdEstoque": this.#qtdEstoque,
            "precoCusto": this.#precoCusto,
            "precoVenda": this.#precoVenda
        }
    }
}