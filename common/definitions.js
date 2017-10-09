const _ = require('./util')
const Schema = require('./schema')
const validator = require('./validator')

const descriptions = _.require(__dirname + '/objects')
Object.assign(descriptions, _.require(__dirname + '/primitives'))
for(const name in descriptions) {
  let schema = new Schema(descriptions[name])
  Object.defineProperties(schema, {
    $schema: {enumerable: false, value: "http://json-schema.org/draft-06/schema#"},
    id: {enumerable: false, value: name},
  })
  validator.addSchema(schema, '/' + name)
  exports[name] = schema
}
