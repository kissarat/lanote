const mg = require('mongoose')

const User = mg.Schema({
  username: String,
  password: String
})

const Note = mg.Schema({
  text: String,
  users: [{
    type: mg.Schema.Types.ObjectId,
    ref: 'user'
  }]
})

module.exports = {
  User: mg.model('user', User),
  Note: mg.model('note', Note),
}
