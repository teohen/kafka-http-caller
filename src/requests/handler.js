const client = require('./clients');
const { kafkaManager } = require('../commons')

const start = async (topicsToConsume) => {
  try {
    console.log('consuming...')
    const consumer = kafkaManager.getConsumer()

    await consumer.connect()
    await consumer.subscribe({ topics: topicsToConsume, fromBeginning: true })

    await consumer.run({
      autoCommit: false,
      eachMessage: async ({ _topic, _partition, message, _heartbeat, _pause }) => {
        const { url, payload } = JSON.parse(message.value.toString())
          await client.makePostRequest({ url, payload })
      }
    })
  } catch (err) {
    console.log('Error sending requests: ', err)
  }
}

module.exports = {
  start
}