module.exports = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      primaryKey: true
    },
    nick: {
      $ref: '#/definitions/nick'
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
