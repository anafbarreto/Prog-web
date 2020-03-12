const Fornecedor = require('../models/Fornecedor')

const controller = {} //objeto vazio


// criando novos dados de fornecedor no BD  
controller.novo = async (req, res) => {
    try {
        await Fornecedor.create(req.body)  //HTTP Status 201: Created
        res.sendStatus(201)
    }
    catch (erro) {
        console.log(erro) //HTTP 500: Internal Server Error
        res.status(500).send(erro)
    }

}

// buscar todos os dados do banco
controller.listar = async (req, res) => {
    try {
        const lista = await Fornecedor.find() //find() sem parametros, retorna todos os fornecedores que estão no banco 
        res.send(lista)
    }

    catch{
        console.log(erro)
        res.status(500).send(erro)
    }
}

// selecionar dados especifico no banco de dados
controller.obterUm = async (req, res) => {
    try {
        const id = req.params.id
        const obj = await Fornecedor.findById(id) //find() com parametros, retorna busca especifica que está no banco 
        if (obj) {     // para objeto encontrado
            res.send(obj) // http 200 implícito
        }
        else {
            res.status(404).end() // http 404: not found
        }
    }
    catch{
        console.log(erro)
        res.status(500).send(erro)
    }
}

//atualizar dados no banco
controller.atualizar = async (req, res) => {
    try {
        const id = req.body._id
        const obj = await Fornecedor.findByIdAndUpdate(id, req.body)
        if (obj) {  // para objeto encontrado e atualizado
            res.status(204).end()
        }
        else {
            res.status(404).end() // http 404: not found
        }
    }
    catch (erro) {
        console.log(erro)
        res.status(500).send(erro)
    }

}

// deletando do BD
controller.delete = async (req, res) => {
    try {
        const id = req.body._id
        const obj = await Fornecedor.findByIdAndDelete(id)
        if (obj) {  // para objeto encontrado e atualizado
            res.status(204).end()
        }
        else {
            res.status(404).end() // http 404: not found
        }
    }
    catch (erro) {
        console.log(erro)
        res.status(500).send(erro)
    }

}

// consulta por parametro (endereco)
async function busca (req, res){
    let criterio = {}
    const atrib = Object.keys(req.query)[0]
    const valor = Object.values(req.query)[0]

    criterio[atrib] = {$regex: valor, $options: 'i'} // $options: 'i' => case insensitive

    console.log('Critério:')
    Console.log(criterio)

    try{
        const lista = await Fornecedor.find(criterio)
        res.send(lista)
    }

    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }
}


module.exports = controller