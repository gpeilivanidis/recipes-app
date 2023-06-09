require('dotenv').config()
require('colors')
const express = require('express')
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/posts', require('./routes/postRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`server is running in http://localhost:${port}`.cyan.underline))
