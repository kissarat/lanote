const _ = require('./util')

module.exports = class Response {
  static empty(description) {
    return {description}
  }

  static boolean(description) {
    return {description, properties: {success: {type: 'boolean'}}}
  }

  static define(result, description) {
    return {description, schema: {type: 'object', properties: {result}}}
  }

  static single($ref, description) {
    return Response.define({$ref}, description)
  }

  static array($ref, description) {
    return Response.define({type: 'array', items: {$ref}}, description)
  }
}
