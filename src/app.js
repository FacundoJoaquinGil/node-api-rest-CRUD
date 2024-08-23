const express = require('express')
const { config } = require('dotenv')
config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bookRoutes = require('./routes/booksroutes')

//paso todo express a mi constante app
const app = express()
//parseamos con el middelware(use) el app para que reciba el json
app.use(bodyParser.json()) 
//creamos la coneccion con la base de datos
mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME}) //pasamos la url de mongo y entre llave el nombre de la base de datos

const db = mongoose.connect;

//con el middelware(use) creamos el endpoint /books?
app.use('/books', bookRoutes)

const port = process.env.PORT || 3000

app.listen(port, () => {

    console.log( `Escuchando el puerto ${port}`)

})