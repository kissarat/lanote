const _ = require('lodash')
const deepAssign = require('deep-assign')

module.exports = {
  __proto__: _,
  assignDeep: deepAssign,
  require(dir = '.') {
    const fs = require('fs')
    const objects = {}
    for(const filename of fs.readdirSync(dir)) {
      let name = /\/?(.*\w+.*)\.js(on)?$/.exec(filename)
      if ((name = name[1]) && 'index' !== name) {
        objects[name] = require(dir + '/' + filename)
      }
    }
    return objects
  }
}
