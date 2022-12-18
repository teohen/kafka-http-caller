const { kafkaManager } = require('../commons')

const getBackOffTimeMs = (n, maximum_back_off) => {
  const random_number_milliseconds = Math.floor(Math.random() * (1000 - 0 + 1) + 0)
  const time = Math.min(((Math.pow(2, n + (random_number_milliseconds / 1000))) * 1000), maximum_back_off)
  return time
}

const produceMessage = async (message) => {
  const payload = JSON.parse(message.value.toString())
  const { retryConfig } = payload

  if (retryConfig.numTry > retryConfig.maxTries) {
    console.log(`retries max limit reached. Sending to DLQ topic `)
  } else {
    const headers = {}
    for (const [key, value] of Object.entries(message.headers)) {
      headers[key] = value.toString()
    }

    const schedulerKey = headers['scheduler-key']

    const produceAfter = (new Date().getTime()
      + getBackOffTimeMs(
        retryConfig.numTry,
        retryConfig.msMaxBackOff)
    ).toString()

    const scheduleHeaders = {
      "produce-after": produceAfter,
      "target-topic": "requests",
      "target-key": "request-key1"
    }
    payload.retryConfig.numTry += 1

    await kafkaManager.produceMessage(payload, 'schedules', schedulerKey, scheduleHeaders)
    console.log(`message produced to topic schedules - key: ${schedulerKey}`)
  }

}

module.exports = {
  produceMessage
}