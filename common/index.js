const config = require('./config')
const swagger = require('./swagger')
const _ = require('./util')
const R = require('./response')

_.defaultsDeep(config, swagger)

try {
  const local = require('./local')
  _.assignDeep(config, local)
}
catch (ex) {
}

const parameters = [{
  name: 'id',
  in: 'path',
  required: true,
  type: 'integer',
  format: 'int32'
}]

const produces = ['application/json']

for (const name in config.published) {
  if (config.published[name]) {
    const lower = name.toLowerCase()
    config.paths[`/list/${lower}`] = {
      operationId: lower + '.list',
      get: {produces, summary: `${name} list`,
        responses: {
          200: R.array('#/definitions/User', 'List')
        }}
    }
    config.paths[`/${lower}`] = {
      post: {
        operationId: lower + '.create',
        produces,
        summary: `Create ${name}`, responses: {
          201: R.boolean('Created')
        }
      }
    }
    config.paths[`/${lower}/{id}`] = {
      get: {
        operationId: lower + '.get',
        summary: `Get ${name} by id`,
        parameters,
        produces,
        responses: {
          200: R.single('#/definitions/User', 'Get ' + name)
        }
      },
      put: {
        operationId: lower + '.update',
        summary: `Update ${name}`,
        parameters,
        produces,
        responses: {
          201: R.boolean('Updated')
        }
      },
      delete: {
        operationId: lower + '.delete',
        produces,
        summary: `Delete ${name}`, parameters, responses: {
          201: R.boolean('Deleted')
        }
      },
    }
  }
}

module.exports = config
