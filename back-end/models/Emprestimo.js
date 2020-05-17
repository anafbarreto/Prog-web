const mongoose = require('mongoose')

// ---> É necessário instalar: yarn add mongoose-sequence
// mongoose está sendo passado como parâmetro para mongoose-sequence
const mongooseSeq = require('mongoose-sequence')(mongoose);


const esquema = mongoose.Schema({
    data_emprestimo: {
        type: Date,
        required: true
    },

    data_devolucao: {
        type: Date,
        required: true
    },

    forma_pagamento: {
        type: String,
        required: true,
        enum: ['DI', 'CC', 'CD']
        // DI = dinheiro
        // CC = cartão de crédito
        // CD = cartão de débito
    },

    data_pagamento: {
        type: Date,
        required: true
    },

    num_emprestimo: {
        type: Number,
        index: { unique: true }
    },

    cliente: {
        type: mongoose.ObjectId,
        ref: 'Cliente', // Nome do model referenciado
        required: true
    },
    produto: {
        type: mongoose.ObjectId,
        ref: 'Produto',
        required: true
     }
})

// inc_field: o campo a ser autoincrementado
// start_seq: o número que irá iniciar a contagem. Default: 1
esquema.plugin(mongooseSeq, { inc_field: 'num_emprestimo', start_seq: 1 });

/*
   Parâmetros do método mongoose.model()
   1º -> Nome do modelo
   2º -> Estrutura (esquema) do modelo
   3º -> Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no
      MongoDB
*/

module.exports = mongoose.model('Emprestimo', esquema, 'emprestimos')