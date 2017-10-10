const Sequelize = require('sequelize')
const path = require('path')
const mock = require('../common/mock')
const swagger = require('../common')
const _ = require('../common/util')

const sq = new Sequelize('sqlite://' + path.join(__dirname, 'invoices.sqlite'), {
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'example.sqlite')
})

const types = {
  'string': Sequelize.STRING,
  'integer': Sequelize.INTEGER,
}

const models = {}

for (const name in swagger.definitions) {
  const schema = swagger.definitions[name]
  const fields = {}
  if ('object' === schema.type) {
    for (const key in schema.properties) {
      const property = schema.properties[key]
      const field = _.pick(property, 'primaryKey')
      field.type = types[property.type]
      if (property.$ref) {
        field.type = types[swagger.definitions[_.last(property.$ref.split('/'))].type]
      }
      fields[key] = field
    }
    const tableName = name.toLowerCase()
    models[name] = sq.define(tableName, fields, {tableName})
  }
}

sq.sync()
    .then(function () {
      for (let i = 0; i < 10; i++) {
        models.User.create(new mock.User())
      }
    })

module.exports = models
