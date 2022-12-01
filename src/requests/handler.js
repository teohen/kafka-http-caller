const client = require('./clients');
const { kafkaManager } = require('../commons')

const url = 'www.google.com'
const payload = {
  "name": "teo",
  "age": 28
}

const start = async () => {
  console.log('consuming...')
  const consumer = kafkaManager.getConsumer()

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log({
        key: message.key.toString(),
        value: message.value.toString(),
        headers: message.headers
      })
    }
  })
}

module.exports = {
  start
}