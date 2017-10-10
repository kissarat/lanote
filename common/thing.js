const _ = require('./util')

module.exports = class Thing {
  constructor(options) {
    if (options) {
      this.assign(options)
    }
  }

  validate() {
    throw new Error('Not implemented')
  }

  assign(...sources) {
    return _.assignDeep(this, ...sources)
  }

  describe() {
    return _.cloneDeep(this)
  }

  // specify(...sources) {
  //   const specified = new this.constructor(this.describe())
  //   specified.assign(...sources)
  //   return specified
  // }

  toString() {
    return JSON.stringify(this.describe())
  }
}
