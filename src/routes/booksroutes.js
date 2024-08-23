const express = require('express')
const router = express.Router()
const Book = require('../models/books.models')

//Creamos un get por id de books
const getBook = async (req, res, next) => {

    //declaramos una varianble sin valor para luego , para luego reacignarla
    let book

    //desestructuramos y trames los id
    const { id } = req.params

    //validamos con la combinacion alfanumerica que usa mongo
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({ message: 'el id no fue encontrado' })
    }
    try {
        book = await Book.findById(id)
        console.log(book)
        if (!book) {
            return res.status(404).json({ message: 'el libro no fue encontrado' })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

    //por que json?
    res.json(book)
    //Qué es next?
    next()
}

//creamos un GET ALL de books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find()
        console.log('GET ALL', books)
        if (books.length === 0) {
            return res.status(204).json([])
        }
        res.json(books)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//POST de book...
router.post('/', async (req, res) => {
    const { title,
        description,
        genre,
        release_Date
    } = req?.body
    if (!title || !description || !genre || !release_Date) {
        return res.status(400).json({ message: 'los campos son obligatorios' })
    }

    const book = new Book({
        title,
        description,
        genre,
        release_Date
    })

    try {
        const newBooks = await book.save()
        res.status(201).json(newBooks)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//de esta forma se exporta las rutas
module.exports = router