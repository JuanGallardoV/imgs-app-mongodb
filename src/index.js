require('dotenv').config()
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const { format } = require('timeago.js')
//? Inicializaciones
const app = express()
require('./database')
//? Configuraciones
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
//? Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
const storage = multer.diskStorage({
        destination: path.join(__dirname, 'public/img/uploads'),
        filename: (req, file, cb, filename) => {
            cb(null, uuidv4() + path.extname(file.originalname))
        }
    })
app.use(multer({storage: storage}).single('image'))
//? Variables Globales
app.use((req, res, next) => {
    app.locals.format = format
    next()
})
//? Rutas
app.use(require('./routes/index'))
//? Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')))
//? Iniciar el server
app.listen(3000, () => {
    console.log(`Servidor en puerto: ${app.get('port')}`)
})