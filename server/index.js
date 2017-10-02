// const db = require('./db')
const express = require('express')

const app = express()
app.use(express.static(__dirname + '/../public'))

app.listen(8060)
