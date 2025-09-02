const express = require('express')
const runApp = require('./app.js')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    try {
        res.send(runApp)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

module.exports = app