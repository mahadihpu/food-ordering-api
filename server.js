//connect mongodb
//run server

const dotenv = require('dotenv')
dotenv.config()

const app = require('./app')
const mongoose = require('mongoose')

mongoose
  .connect(process.env.MONGODB_SERVER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to mongodb'))
  .catch((error) => console.log(error))
const port = process.env.PORT
app.listen(port, () => {
  console.log(`listening to port ${port}`)
})
