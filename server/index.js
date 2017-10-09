const {User, Note} = require('./db')
const express = require('express')
const bodyParser = require('body-parser')
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const SocketIO = require('socket.io')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const fs = require('fs')

const app = express()
{
  app.use(express.static(__dirname + '/../public'))
  app.use(cookieParser())
  app.use(bodyParser.json({type: 'application/json'}))
  app.use(expressSession({secret: 'gel6hiFahnuhaemone7ohdeB'}))
  app.use(flash())
  app.use(function(req, res) {
    const file = fs.readFileSync(__dirname + '/../public/index.html')
    res.writeHead(200, {
      'content-type': 'text/html'
    })
    res.end(file)
  })
}

const office = express.Router()
office.use(passport.initialize())
office.use(passport.session())

app.post('/api/login', function (req, res, next) {
  passport.authenticate('login', function (error, user) {
    if (error) {
      res.json(502, {error})
    }
    else if (user) {
      res.json({success: true, result: user._id})
    }
    else {
      res.json({success: false})
    }
  })(req, res, next)
});

office.get('/me',
    passport.authenticate('login'),
    function (req, res) {
      res.json(req.user)
    })

office.post('/logout', function (req, res) {
  req.logout()
  req.session.destroy()
  res.json({success: true})
})

office.route('/user')
    .post(function (req, res) {
      const user = new User()
      user.username = req.param('username')
      user.password = req.param('password')
      user.save()
          .then(() => res.json({success: true}))
          .catch(error => res.json({error}))
    })

office.route('/node', passport.authenticate('login'))
    .get(function (req, res) {
      Note.find({})
    })
    .post(function (req, res) {
      const note = new Note()
      note.text = req.param('text')
      note.save()
          .then(() => res.json({success: true}))
          .catch(error => res.json({error}))
    })

app.use('/api', passport.authenticate('login'), office)

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  console.log(id)
  User.findById(id, function (err, user) {
    console.log(err, user)
    done(err, {_id: user._id, username: user.username})
  });
});

passport.use('login', new LocalStrategy(
    function (username, password, done) {
      User.findOne({username, password}, function (err, user) {
        if (err) {
          return done(err)
        }
        else if (user) {
          return done(null, user)
        }
        else {
          return done(null, false)
        }
      })
    })
)

const socketIO = SocketIO.listen(app.listen(8060))
