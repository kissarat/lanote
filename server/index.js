// const {User, Note} = require('./db')
const express = require('express')
const bodyParser = require('body-parser')
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const SocketIO = require('socket.io')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const fs = require('fs')
const swagger = require('../common')
const swaggerUi = require('swagger-ui-express');

const app = express()
{
  app.use(express.static(__dirname + '/../public'))
  app.use(cookieParser())
  app.use(bodyParser.json({type: 'application/json'}))
  app.use(expressSession({secret: 'gel6hiFahnuhaemone7ohdeB'}))
  app.use(flash())
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

app.use(swagger.basePath, router)

app.use(function (req, res) {
  const file = fs.readFileSync(__dirname + '/../public/index.html')
  res.writeHead(200, {
    'content-type': 'text/html'
  })
  res.end(file)
})

const socketIO = SocketIO.listen(app.listen(8060))
