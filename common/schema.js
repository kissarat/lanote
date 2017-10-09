const Thing = require('./thing')
const validator = require('./validator')
const _ = require('./util')

module.exports = class Schema extends Thing {
  assign(options) {
    if(_.isObject(options.properties)) {
      for(const name in options.properties) {
        let v = options.properties[name]
        if ('string' === typeof v) {
          options.properties[name] = {type: v}
        }
      }
    }
    return super.assign(options)
  }

  validate(object) {
    return validator.validate(object, this.id)
  }
}
