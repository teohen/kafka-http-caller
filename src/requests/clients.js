const axios = require('axios')

const makePostRequest = async ({ url, payload }) => {
  console.log('requesting...', config)
  try {
    const result = await axios.post(url, payload)
    return result
  } catch (err) {
    console.log('error in makePostRequest', err)
    throw err
  }
}

module.exports = {
  makePostRequest
}