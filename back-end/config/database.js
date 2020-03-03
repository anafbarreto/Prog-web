const mongoose = require('mongoose')
module.exports = function(uri) {
    mongoose.connect(uri, {
        useNewUrlParser:true,
        useUnifiedTopology: true
    })

    mongoose.connection.on('connected', () =>
    console.log(`Mongoose! conectado a ${uri}`)
    )
    mongoose.connection.on('disconnected', () =>
    console.log(`Mongoose! desconectado de ${uri}`)
    )
}