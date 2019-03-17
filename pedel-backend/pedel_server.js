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


// Register
app.post('/register' , (req, res) => {
    // req will be what user send for frontend page from your login form like (email, password)
    // req is json so part of data you need is in `body` object
    //const { username, email, password } = req.body;
    console.log(req.body)
            
    // now you want to validate data that client sent 
    // if ( !username || !password || !email ) {
    //     res.status(400).json({ success: false, message: 'info not enough', });
    // }

    // see if name or email is occupied
    // this is User.find is from mongo model but you find here if that email exists in your db
    // your is sql
    //const user = await User.findOne({ $or: [ { username }, { email } ] });
    // yep this is bool, yep you can check either or just email or just usernme
    //if (!user) {
    // so here is logic for add new user
    // you want to send him confirmation email or so 
    // 
    //....
    
    
    // here your logic for adding user to user
    // hasing pw
    // after that you add to db
    // for better track you log whats saved to db
    // console.log("USER ADDED TO DB ", {user:username,..})
    
    res.status(200).json({ success: true, message: "User succesfully registerd"})
    
    //} 
    //else{
    //this will log to your server console
    //console.log('user not save.Email or username alreasy exists')
    //this will return to user
    //res.status(400).json({succes: false, message: "User exists try another email or username" })
    //}


    // here you do your logic checking if user exists in db
    // if he does your return some message like shown below 
    // do you have 
        
    // sry ignore this guys
})


// Login
app.post('/login' , (req, res) => {
    // req will be what user send for frontend page from your login form like (email, password)
    // req is json so part of data you need is in `body` object
    const { email, password } = req.body;

    // here you do your logic checking if user exists in db
    // if he does your return some message like shown below 
        
    let data = {
    message: "user login"
    }
    res.json(data)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))




// add node_modules to gitignore
// passport for auth? (http://www.passportjs.org/)
