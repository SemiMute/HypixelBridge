'use strict'
process.title = 'Hypixel Discord Chat Bridge'

const app = require('./src/Application')
const keyv = require(`@keyv/sqlite`)

app
  .register()
  .then(() => {
    app.connect()
  })
  .catch(err => {
    console.error(err)
  })