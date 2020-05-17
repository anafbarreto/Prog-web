const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   descricao: {
      type: String,
      required: true
   },
   preco_compra: {
      type: Number,
      required: true,
      min: 0
   },
   preco_venda: {
      type: Number,
      min: 0
   },
   preco_emprestimo: {
      type: Number,
      required: true,
      min: 0
   },
   data_publicacao: {
      type: Date
   },
   quantidade: {
      type: Number,
      required: true,
      default: 0 // Valor padrão
   },
   categoria: {
      type: String,
      required: true,
      validate: {
         validator: function (val) {
            return val === "revista" || val === "livro"
         },
         message: 'preencher a categoria como livro ou revista'
      }
   },
   ISSN: { //valido para revistas
      type: Number,
      default: 0
   },

   ISBN: { //valido para livros
      type: Number,
      default: 0
    },

   genero: {
   type: String,
   required: true,
},
   editora: {
   type: mongoose.ObjectId,
   ref: 'Editora', // Nome do model referenciado
   required: true
}
})

/*
   Parâmetros do método mongoose.model()
   1º -> Nome do modelo
   2º -> Estrutura (esquema) do modelo
   3º -> Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no
      MongoDB
*/
module.exports = mongoose.model('Produto', esquema, 'produtos')