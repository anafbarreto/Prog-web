const mongoose = require('mongoose')
module.exports = function(uri) {
    mongoose.connect(uri, {
        useNewUrlParser:true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })

    mongoose.connection.on('connected', () =>
    console.log(`Mongoose! conectado a ${uri}`)
    )
    mongoose.connection.on('disconnected', () =>
    console.log(`Mongoose! desconectado de ${uri}`)
    )
    mongoose.connection.on('error', erro =>
    console.log(`Mongoose! ERRO ao conectar ${uri}: {erro}`)
    )
    process.on('SIGINT', () =>
        mongoose.Connection.CLOSE(( ) => {
            Console.log(`Mongoose! desconectado pelo termino da aplicação`)
            process.exit(0) // 0 é a saida sem erros
        })
    )    

}