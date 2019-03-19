const express = require('express')
const sha256 = require('sha-256-js')
//const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const Sequelize = require('sequelize');
const app = express()
const port = 3000


// /home/mitchell/Desktop/pedel/pedel-backend/users.db'
//const sequelize = new Sequelize("sqlite:./users.sqlite");

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './users.db'
});

db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Sequelize model of the users table
const User = db.define('user', {
    username: {
        type: Sequelize.STRING
        // allowNull: false
    },
    email: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    password: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    type: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
});

User.sync({ force: true });

// morgan is used to give OPTIONS and POST information about the req    
// app.use(morgan('combined'))

// CORS (Cross-Origin Resource Sharing). Used for running 2 separate apps?
app.use(cors({
    origin: '*'
}))

app.use(bodyParser.json())
//app.use(express.static( __dirname + '/public'))
//app.get('/', (req, res) => res.sendFile("index.html"))
// [server] -> [client]  localhost:3000/ 


// Register
app.post('/register' , (req, res) => {
    // req will be what user send for frontend page from your login form like (email, password)
    // req is json so part of data you need is in `body` object
    const { username, email, password } = req.body;
    // TODO: Comment/remove this
    console.log(req.body)

            
    // now you want to validate data that client sent 
    if ( !username || !password || !email ) {
        res.status(200).json({ success: true, message: 'Missing field', });
    }
    



    // see if name or email is occupied
    // else if (username || email){
    //     let sqlu = 'SELECT * FROM users WHERE Username = ?'
    //     let sqle = 'SELECT * FROM users WHERE Email = ?'
    //     //console.log("TEST")
    //     checkInputs(sqlu, username)
    //     checkInputs(sqle, email)
    // }
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
    //db.run("INSERT INTO users ")

    //else
    else {
        res.status(200).json({ success: true, message: "User succesfully registered"})
        User.findAll().then(users => {
            console.log("All users:", JSON.stringify(users, null, 4));
          });
    }
    
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

    // function checkInputs(sql, field){
    //     db.get(sql, [field], (err, row) => {
    //         if (err) {
    //           throw err;
    //         }
    //         if (row){
    //             res.status(200).json({ success: true, message: field + ' is taken', })
    //         }
    //         else {
    //             console.log(`You good`);
    //         }
    //     });
    // }
        
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
