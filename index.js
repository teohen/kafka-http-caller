require('dotenv').config()
const express = require('express')
const { requestHandler } = require('./src/requests')


const PORT = process.env.PORT

const app = express()

requestHandler.start([process.env.REQUESTS_TOPIC])

app.listen(PORT, () => {
  console.log(`Running server on por ${PORT}`)
})