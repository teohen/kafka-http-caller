require('dotenv').config()
const express = require('express')
const { kafkaManager } = require('./src/commons')
const { requestHandler } = require('./src/requests')


const PORT = process.env.PORT

const app = express()

kafkaManager.prepareConsumers([process.env.REQUESTS_TOPIC])

// requestHandler.start()

app.listen(PORT, () => {
  console.log(`Running server on por ${PORT}`)
})