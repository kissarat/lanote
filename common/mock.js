const faker = require('faker')

function User() {
  this.nick = faker.internet.userName()
  this.name = faker.name.findName()
  this.email = faker.internet.email()
  this.image = faker.internet.avatar()
}

module.exports = {
  User
}
