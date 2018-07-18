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

app.get(/big.*/, (req, res, next) => {
    console.log('BIG USER MOTHAFUCKING ACCESS!')
    next()
})

app.get(/.*dog.*/, (req, res, next) => {
    console.log("GOOD DOGO!!")
    next()
})

app.get('/', (req, res) => {
    res.render('index', {users: users})

    // let buffer = ''
    // users.forEach(user =>  buffer += '<a href="/' + user.username + '">' + user.name.full + '</a>' + '<br>')
                             
    // res.send(buffer)
})




app.get('/:username', (req, res) => {
    res.send(`You accessed ${req.params.username}'s profile.`)
})

var server = app.listen(4000, () => {
    console.log(`Server running at http://localhost ${server.address().port}`)
})

