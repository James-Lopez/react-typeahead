const express = require('express')
const { MongoClient } = require('mongodb')
const app = express()

MongoClient.connect('mongodb://localhost/clock', (error, db) => {
  app.use(express.static('./public'))
  const elements = db.collection('elements')

  app.get('/elements', (req, res) => {
    elements
      .find()
      .toArray()
      .then(result => res.json(result))
      .catch(err => {
        console.error(err)
        res.sendStatus(500)
      })
  })

  app.listen(1337, console.log('Open on port 1337'))
})
