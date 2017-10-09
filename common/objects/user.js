module.exports = {
  properties: {
    nick: {
      type: {$ref: '/nick'}
    },
    email: {
      type: 'string',
      format: 'email'
    },
    image: {
      type: 'string',
      format: 'uri'
    },
    name: 'string'
  }
}
