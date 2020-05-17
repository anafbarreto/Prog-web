const Cliente = require('../models/Cliente')

const controller = {} // Objeto vazio


// criando novos dados - BD
controller.novo = async (req, res) => {
   try {
      await Cliente.create(req.body)
      res.status(201).end()  // HTTP Status 201: Created
   }
   catch (erro) {
      console.log(erro)
      res.status(500).send(erro) // HTTP 500: Internal Server Error
   }
}

// Buscar dados BD
controller.listar = async (req, res) => {
   
   if(Object.keys(req.query).length > 0) { // Se houver query string
      busca(req, res)
   }
   else { // sem query string
      try {
         const lista = await Cliente.find() // find(), sem parâmetros, retorna todos
         res.send(lista) // HTTP 200 implícito
      }
      catch {
         console.log(erro)
         res.status(500).send(erro)
      }
   }

}

// Buscar dados especificos BD
controller.obterUm = async (req, res) => {

   try {
      const id = req.params.id
      const obj = await Cliente.findById(id)
      if (obj) { // obj encontrado
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

// Atualizar dados BD
controller.atualizar = async (req, res) => {
   try {
      const id = req.body._id
      const obj = await Cliente.findByIdAndUpdate(id, req.body)
      if (obj) { // obj encontrado e atualizado
         res.status(204).end() // HTTP 204: No content
      }
      else {
         res.status(404).end()
      }
   }
   catch (erro) {
      console.log(erro)
      res.status(500).send(erro)
   }
}


// Exluir dados BD
controller.excluir = async (req, res) => {
   try {
      const id = req.body._id
      const obj = await Cliente.findByIdAndDelete(id)
      if (obj) {
         res.status(204).end()
      }
      else {
         res.status(404).end()
      }
   }
   catch (erro) {
      console.log(erro)
      res.status(500).send(erro)
   }
}


//// consulta por parametro (endereco)
async function busca(req, res) {
   let criterio = {}
  
   const atrib = Object.keys(req.query)[0]
   const valor = Object.values(req.query)[0]
   
   criterio[atrib] = { $regex: valor, $options: 'i'} // $options: 'i' => case insensitive

   console.log('Critério:')
   console.log(criterio)

   try {
      const lista = await Cliente.find(criterio)
      res.send(lista)
   }
   catch(erro) {
      console.log(erro)
      res.status(500).send(erro)
   }
}

module.exports = controller