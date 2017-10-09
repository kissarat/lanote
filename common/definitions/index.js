const _ = require('../util')
const Schema = require('../schema')
const validator = require('../validator')

const definitions = {
  nick: {
    type: 'string',
    pattern: /^[\w_]{4,24}$/
  },

  User: require('./user')
}

for (const name in definitions) {
  let schema = new Schema(definitions[name])
  // if (schema.pattern instanceof RegExp) {
  //   schema.pattern = schema.pattern.toString()
  // }
  Object.defineProperties(schema, {
    // $schema: {enumerable: false, value: "http://json-schema.org/draft-06/schema#"},
    id: {enumerable: false, value: name},
  })
  validator.addSchema(schema, '/' + name)
  definitions[name] = schema
}

module.exports = definitions
