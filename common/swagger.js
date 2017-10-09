const definitions = require('./definitions')

module.exports = {
  swagger: '2.0',
  info: {
    version: '0.0.1',
    contact: {
      email: 'kissarat@gmail.com'
    }
  },
  basePath: '/api',
  definitions,
  paths: {
    '/': {
      get: {
        summary: 'API Description'
      }
    }
  }
}
