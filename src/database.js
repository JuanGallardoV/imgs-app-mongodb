const mongoose = require('mongoose')
const connectionString = process.env.MONGO_DB_URI

mongoose.connect(connectionString)
  .then(() => {
    console.log('Conectado con la base de datos')
  }).catch(error => {
    console.error(error)
  })