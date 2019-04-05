const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const UserModel = require("../model/user");
const keys = require("../config/keys");
const bcrypt = require("bcrypt");

//Create a passport middleware to handle User login
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.user
          .findOne({
            where: {
              email: email
            }
          })
          .then(res => {
            return JSON.parse(JSON.stringify(res));
          });
        //Find the user associated with the email provided by the user
        if (!user || user === null) {
          //If the user isn't found in the database, return a message
          return done(null, false, { message: "User not found" });
        }
        bcrypt.compare(password, user.password).then(response => {
          if (response !== true) {
            return done(null, false, { message: "Wrong Password" });
          }
          return done(null, user);
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

//Create a passport middleware to handle user registration
passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        UserModel.user
          .findOne({
            where: {
              email: email
            }
          })
          .then(user => {
            //Save the information provided by the user to the the database
            if (user != null) {
              console.log("Email already in use");
              return done(null, false, { message: "Email already in use" });
            } else {
              bcrypt.hash(password, keys.bcrypt_salt).then(hashedPassword => {
                UserModel.user
                  .create({
                    email: email,
                    password: hashedPassword,
                    type: "user",
                    favourite_book: null,
                    favourite_genre: null,
                    num_books_read: null,
                    read_time: null
                  })
                  .then(user => {
                    console.log("user created 123");
                    return done(null, user);
                  });
              });
            }
          });
      } catch (error) {
        done(error);
      }
    }
  )
);

//This verifies that the token sent by the user is valid
passport.use(
  "jwt",
  new JWTstrategy(
    {
      //secret we used to sign our JWT
      secretOrKey: keys.jwt_secret,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (payload, done) => {
      //Pass the user details to the next middleware
      const user = await UserModel.user
        .findOne({
          where: {
            email: payload.user.email
          }
        })
        .then(res => {
          return JSON.parse(JSON.stringify(res));
        });

      if (user) {
        console.log("user found in db in passport");
        // note the return removed with passport JWT - add this return for passport local
        done(null, user);
      } else {
        console.log("user not found in db");
        done(null, false);
      }
    }
  )
);
