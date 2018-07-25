const express = require('express')
const app = express()
const fs = require('fs')
const _ = require('lodash')
const users = []
const engines = require('consolidate')


fs.readFile('users.json', {encoding: 'utf8'}, (err, data) => {
    if (err) throw err

    JSON.parse(data).forEach(user => {
            user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
            users.push(user)
    })
 })

app.engine('hbs', engines.handlebars)

app.set('views', "./views")
app.set('view engine', 'hbs')

app.use("/profilepics", express.static('images'))


app.get('/', (req, res) => {
    res.render('index', {usersa: users})

})


app.get('/:username', (req, res) => {
    const username = req.params.username
    res.render('user', {username: username})
})

var server = app.listen(4000, () => {
    console.log(`Server running at http://localhost ${server.address().port}`)
})

