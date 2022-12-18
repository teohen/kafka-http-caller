const { kafkaManager } = require('../commons')

const produceMessage = async (message) => {
  const payload = JSON.parse(message.value.toString())
  const counter = payload?.counter ? payload.counter + 1 : 1
  
  const headers = {}
  for (const [key, value] of Object.entries(message.headers)) {
    headers[key] = value.toString()
  }

  const schedulerKey = headers['scheduler-key']

  const now = new Date().getTime()
  
  const scheduleHeaders = {
    "produce-after": (now + 60000).toString(),
    "target-topic": "requests",
    "target-key": "request-key6"
  }
  const schedulePayload = {
    ...payload,
    counter
  }


  await kafkaManager.produceMessage(schedulePayload, 'schedules', schedulerKey, scheduleHeaders)
  console.log(`message produced to topic schedules - key: ${schedulerKey}`)
}

module.exports = {
  produceMessage
}