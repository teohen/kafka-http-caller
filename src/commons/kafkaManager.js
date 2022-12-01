const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: process.env.CLIENT_ID,
  brokers: [process.env.BROKERS]
})

const admin = kafka.admin()
const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'request-group' })

const prepareConsumers = async (topicsToConsume) => {
  
  await consumer.connect()
  await consumer.subscribe({ topics: topicsToConsume, fromBeginning: true })

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log({
        key: message.key.toString(),
        value: message.value.toString(),
        headers: message.headers,
        partition,
      })
    }
  })
  console.log(`subscribed to topics: ${topicsToConsume}`)
}

const getProducer = () => {
  return producer
}

const getConsumer = () => {
  return consumer
}

const getClientAdmin = () => {
  return admin
}



module.exports = {
  getProducer,
  getConsumer,
  getClientAdmin,
  prepareConsumers
}