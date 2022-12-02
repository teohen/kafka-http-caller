const axios = require('axios')

const makePostRequest = async ({ url, payload }) => {
  console.log('requesting...')
  return axios.post(url, payload)
}

module.exports = {
  makePostRequest
}