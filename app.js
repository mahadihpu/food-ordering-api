const express = require('express')
const cors = require('cors')
const app = new express()
const userRouters = require('./routers/userRouter')
const orderRouters = require('./routers/orderRouter')
app.use(express.json())
app.use(cors())

app.use('/user', userRouters)
app.use('/order', orderRouters)
module.exports = app
