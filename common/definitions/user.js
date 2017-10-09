module.exports = {
  type: 'object',
  properties: {
    nick: {
      type: {$ref: '#/definitions/nick'}
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
