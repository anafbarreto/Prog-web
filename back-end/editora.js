const Editora = require('../models/Editora')

const controller = {} // Objeto vazio

//criando novos dados de fornecedor no BD
controller.novo = async (req, res) => {
   try {
      await Editora.create(req.body) // HTTP Status 201: Created
      res.status(201).end()
   }
   catch (erro) {
      console.log(erro) // HTTP 500: Internal Server Error
      res.status(500).send(erro)
   }
}

//buscar dados no banco
controller.listar = async (req, res) => {
   
   if(Object.keys(req.query).length > 0) { // Se houver query string
      busca(req, res)
   }
   else { // sem query string
      try {
         const lista = await Editora.find() // find(), sem parâmetros, retorna todos
         res.send(lista) // HTTP 200 implícito
      }
      catch {
         console.log(erro)
         res.status(500).send(erro)
      }
   }

}

//buscar dados especificos 
controller.obterUm = async (req, res) => {

   try {
      const id = req.params.id
      const obj = await Editora.findById(id)
      if (obj) { // obj foi encontrado
         res.send(obj) // HTTP 200 implícito
      }
      else {
         res.status(404).end() // HTTP 404: Not found
      }
   }
   catch (erro) {
      console.log(erro)
      res.status(500).send(erro)
   }
}

//atualizar dados no banco
controller.atualizar = async (req, res) => {
   try {
      const id = req.body._id
      const obj = await Editora.findByIdAndUpdate(id, req.body)
      if (obj) { // obj encontrado e atualizado
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


//deletando do BD
controller.excluir = async (req, res) => {
   try {
      const id = req.body._id
      const obj = await Editora.findByIdAndDelete(id)
      if (obj) { //encontrado e excluido
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
async function busca(req, res) {
   let criterio = {}
   const atrib = Object.keys(req.query)[0]
   const valor = Object.values(req.query)[0]
   
   criterio[atrib] = { $regex: valor, $options: 'i'} // $options: 'i' => case insensitive

   console.log('Critério:')
   console.log(criterio)

   try {
      const lista = await Editora.find(criterio)
      res.send(lista)
   }
   catch(erro) {
      console.log(erro)
      res.status(500).send(erro)
   }
}

module.exports = controller