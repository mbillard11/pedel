const express = require('express')
const sha256 = require('sha-256-js')
//const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const Sequelize = require('sequelize')
const app = express()
const port = 3000
const cookieSession = require('cookie-session') 
const passport = require('passport')

// getting the local authentication type
const LocalStrategy = require('passport-local').Strategy

//User.sync({ force: true });

// morgan is used to give OPTIONS and POST information about the req    
// app.use(morgan('combined'))

// CORS (Cross-Origin Resource Sharing). Used for running 2 separate apps?
app.use(cors({
    origin: '*'
}))

app.use(bodyParser.json())

app.use(cookieSession({  
    name: 'mysession',
    keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(passport.initialize())
app.use(passport.session())

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './users.db'
});

db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err)
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

// Register
app.post('/register' , async (req, res) => {
    // req will be what user send for frontend page from your login form like (email, password)
    // req is json so part of data you need is in `body` object
    const { username, email, password } = req.body;
    // TODO: Comment/remove this
    console.log(req.body)
    let usernameCheck = null
    let emailCheck = null
    await User.findAll({
        where: {
            username: username
          }
    }).then(users => {
        usernameCheck = (JSON.parse(JSON.stringify(users)).length)
        console.log('UsernameCheck: ',usernameCheck)

    })
    await User.findAll({
        where: {
            email: email
          }
    }).then(users => {
        emailCheck = (JSON.parse(JSON.stringify(users)).length)

    })
     
    // now you want to validate data that client sent 
    if ( !username || !password || !email ) {
        res.status(200).json({ success: false, message: 'Missing field', })
    }
    
    else if (usernameCheck > 0){
        res.status(200).json({ success: false, message: 'Username Taken', })
    }

    else if (emailCheck > 0){
        res.status(200).json({ success: false, message: 'Email Taken', })
    }

    else {
        User.create({ username: username, email: email, password: password, type: 'user' })
        res.status(200).json({ success: true, message: 'User succesfully registered'})
    }
           
})


// Login
app.post('/login' , (req, res, next) => {

    passport.authenticate("local", (err, user, info) => {
        if (err) {
          return next(err);
        }
    
        if (!user) {
          //return res.status(400).send([user, "Cannot log in", info]);
          return res.status(200).json({ success: false, message: info.message})
        }
        // Do we need login? Authenticate invokes login automatically
        req.login(user, err => {
          //res.send("Logged in");
          res.status(200).json({ success: true, message: "Logged in" })
          //console.log('USER: ',user)
        });
      })(req, res, next);

    //const { username, password } = req.body;

    //let usernameCheck = null;
    //let member = null

    // const member = await User.findOne({
    //     where: {
    //         username: username
    //     }
    // });


    // if (!username || !password) {
    //     res.status(200).json({ success: false, message: "Missing field" })
    // } 
    // else if (!member) {
    //     res
    //       .status(200)
    //       .json({ success: false, message: "Username Does Not Exist" })
    // } 
    // else {
    //     let pass = member.dataValues.password;
    //     // /!== checks that is equal both value and type
    //     if (password !== pass) {
    //         res.status(200).json({ success: false, message: "Wrong Password!" })
    //     } else {
    //         res.status(200).json({ success: true, message: "User Logged In!" })
    //     }
    // }
})

app.get("/logout", function(req, res) {  
    req.logout();
  
    console.log("logged out")
  
    return res.send();
    // return res.status(200).json({ success: false, message: "Logged out" })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

passport.use(  
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password"
      },
  
      (username, password, done) => {
        User.findOne({
            where: {
                username: username
            }
        }).then(user => {
            if(user.password == password){
                done(null, user)
            }
            else{
                done(null, false, { message: 'Incorrect username or password'})
            }
        }).catch(err => {
            done(null, false, { message: 'You cannot log in'})
        });
    
    
        // if (!username || !password) {
        //     res.status(200).json({ success: false, message: "Missing field" })
        // } 
        // else if (!member) {
        //     res
        //       .status(200)
        //       .json({ success: false, message: "Username Does Not Exist" })
        // } 
        // else {
        //     let pass = member.dataValues.password;
        //     // /!== checks that is equal both value and type
        //     if (password !== pass) {
        //         res.status(200).json({ success: false, message: "Wrong Password!" })
        //     } else {
        //         res.status(200).json({ success: true, message: "User Logged In!" })
        //     }
        // }
  
        // if (user) {
        //   done(null, user)
        // } else {
        //   done(null, false, { message: 'Incorrect username or password'})
        // }
      }
    )
  )

passport.serializeUser((user, done) => {  
  done(null, user.id)
})

// Adopt to database
passport.deserializeUser((id, done) => {  
  let user = users.find((user) => {
    return user.id === id
  })

  done(null, user)
})
