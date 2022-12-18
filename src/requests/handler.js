const client = require('./clients');
const { kafkaManager } = require('../commons')
const { producer } = require('../producer')

const processMessage = async ({ topic, _partition, message, _heartbeat, _pause }) => {
  const messageValue = JSON.parse(message.value.toString())
  console.log('VALUE', messageValue)
  try {
    await client.makePostRequest({ url: messageValue.url, payload: messageValue.payload })
  } catch (err) {
    console.log('Error sending the request')
    await producer.produceMessage(message)
  }
};

const start = async (topicsToConsume) => {
  try {
    await kafkaManager.consumeTopic(topicsToConsume, processMessage)
  } catch (err) {
    console.log('Error handling the schedules', err)
  }
}

module.exports = {
  start
}