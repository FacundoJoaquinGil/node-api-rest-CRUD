//creamos y exportamos el modelo de base de datos no relacional que vamos a utilizar, con ayuda de la libreria mongoose

const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    genre: String,
    release_Date: String
})

module.exports = mongoose.model( 'books', bookSchema )