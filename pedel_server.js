const express = require('express')
const sha256 = require('sha-256-js')
const sqlite3 = require('sqlite3').verbose()
const app = express()
const port = 3000

const db = new sqlite3.Database( __dirname + '/users.db',
    function(err) {
        if ( !err ) {
            console.log('opened users.db');
        }
    });

app.use(express.static( __dirname + '/public'))
app.get('/', (req, res) => res.sendFile("index.html"))
app.get('/login.html', (req, res) => res.sendFile("login.html"))
app.get('/register.html', (req, res) => res.sendFile("register.html"))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// add node_modules to gitignore
