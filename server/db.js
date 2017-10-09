const mg = require('mongoose')
mg.connect('mongodb://localhost/lanote')

const User = mg.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const Note = mg.Schema({
  text: {
    type: String,
    required: true
  },
  users: [{
    type: mg.Schema.Types.ObjectId,
    ref: 'user'
  }]
})

module.exports = {
  User: mg.model('user', User),
  Note: mg.model('note', Note),
}
