const config = require('./config')
const swagger = require('./swagger')
const _ = require('./util')

_.defaultsDeep(config, swagger)

try {
  const local = require('./local')
  _.assignDeep(config, local)
}
catch (ex) {
}

for(const name in config.published) {
  if (config.published[name]) {
    const lower = name.toLowerCase()
    config.paths[`/list/${lower}`] = {
      get: {summary: `${name} list`}
    }
    config.paths[`/${lower}`] = {
      post: {summary: `Create ${name}`}
    }
    config.paths[`/${lower}/{id}`] = {
      get: {summary: `Get ${name} by id`},
      put: {summary: `Update ${name}`},
      delete: {summary: `Delete ${name}`},
    }
  }
}

module.exports = config
