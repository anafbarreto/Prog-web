const mongoose = require('mongoose')

const exemplo = mongoose.Schema({
    razao_social: {
        type: String,
        required: true
    },
    nome_fantasia: {
        type: String
    },
    cnpj: {
        type: String,
        required: true
    },
    inscricao_estadual: {
        type: String,
    },
    endereco: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
     }

})

/* parametros do metodo mongoose.model()
1° nome do modelo
2° estrutura exemplo do modelo
3° nome da coleção (collection) em que os objetos criados a partir do modelo
serão armazenados no Mongo DB.
*/

module.exports = mongoose.model('fornecedor', exemplo, 'fornecedores')
