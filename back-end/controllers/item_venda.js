const ItemVenda = require('../models/ItemVenda')

const controller = {} // Objeto vazio

controller.novo = async (req, res) => {
   try {
      await ItemVenda.create(req.body) // HTTP Status 201: Created
      res.status(201).end()
   }
   catch (erro) {
      console.log(erro)
      res.status(500).send(erro) // HTTP 500: Internal Server Error
   }
}

controller.listar = async (req, res) => {
   
   if(Object.keys(req.query).length > 0) { // Se houver query string
      busca(req, res)
   }
   else { // sem query string
      try {
         // find(), sem parâmetros, retorna todos
         //const lista = await ItemVenda.find().populate('venda').populate('produto')
         // populate() dentro de populate() / populate() de segundo nível

         const lista = await ItemVenda.find().populate(

            // path: nome do campo populado (1º nível)
            // populate: nome do campo populado (2º nível)

            { path:'venda', populate: 'cliente' }
         )
         .populate(

            // path: nome do campo a ser populado
            // select: lista de campos a serem exibidos separados por espaço
            
            { path: 'produto', select: 'descricao data_publicacao editora', populate: 'editora' }
         )

         res.send(lista) // HTTP 200 implícito
      }
      catch {
         console.log(erro)
         res.status(500).send(erro)
      }
   }

}

controller.obterUm = async (req, res) => {

   try {
      const id = req.params.id
      const obj = await ItemVenda.findById(id)
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

controller.atualizar = async (req, res) => {
   try {
      const id = req.body._id
      const obj = await ItemVenda.findByIdAndUpdate(id, req.body)
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

controller.excluir = async (req, res) => {
   try {
      const id = req.body._id
      const obj = await ItemVenda.findByIdAndDelete(id)
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

async function busca(req, res) {
   let criterio = {}
  
   const atrib = Object.keys(req.query)[0]
   const valor = Object.values(req.query)[0]
   
   criterio[atrib] = { $regex: valor, $options: 'i'} // $options: 'i' => case insensitive

   console.log('Critério:')
   console.log(criterio)

   try {
      const lista = await ItemVenda.find(criterio)
      res.send(lista)
   }
   catch(erro) {
      console.log(erro)
      res.status(500).send(erro)
   }
}

module.exports = controller