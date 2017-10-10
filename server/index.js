const {User} = require('./db')
const express = require('express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const SocketIO = require('socket.io')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const swagger = require('../common')
const swaggerUi = require('swagger-ui-express')
const ModelController = require('./modules/model')
const _ = require('../common/util')

const app = express()
{
  app.use(express.static(__dirname + '/../public'))
  app.use(cookieParser())
  app.use(bodyParser.json({type: 'application/json'}))
  app.use(expressSession({secret: 'gel6hiFahnuhaemone7ohdeB'}))
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

const router = express.Router()
router.get('/', function (req, res) {
  res.json(swagger)
})
router.get('/swagger.json', function (req, res) {
  res.json(swagger)
})
router.get('/swagger.html', swaggerUi.serve, swaggerUi.setup(swagger))
router.use(express.static(__dirname + '/../node_modules/swagger-ui-express/static'))

for(const path in swagger.paths) {
  const methods = swagger.paths[path]
  for(const method in methods) {
    const route = methods[method]
    if ('string' === typeof route.operationId) {
      let uri = path
      if (router.parameters instanceof Array) {
        for (const {name} of router.parameters) {
          uri = uri.replace(`{${name}}`, ':' + name)
        }
      }
      const action = ModelController.prototype[_.last(route.operationId.split('.'))]
      if ('function' === typeof action) {
        router[method](uri, action)
      }
    }
  }
}

app.use(swagger.basePath, router)

app.use(function (req, res) {
  const file = fs.readFileSync(__dirname + '/../public/index.html')
  res.writeHead(200, {
    'content-type': 'text/html'
  })
  res.end(file)
})

const socketIO = SocketIO.listen(app.listen(8060))
