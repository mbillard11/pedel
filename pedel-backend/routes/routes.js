const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

router.post('/login', (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                return res.status(200).json(info);
            }
           req.login(user, { session: false }, (error) => {
               if (error) return next(error);
                //We don't want to store the sensitive information such as the
                //user password in the token so we pick only the email and id
                 const body = { id: user.id, email: user.email };
                //Sign the JWT token and populate the payload with the user email and id
                const token = jwt.sign({ user: body }, keys.jwt_secret);
                //Send back the token to the user
                return res.json({ token }); 
           });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
})


router.post('/register', (req, res, next) => {
    passport.authenticate('register', async (err, user, info) => {    
        try {
            if (err || !user) {
                next(err);
            }
            return res.status(200).json(info);
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
})



module.exports = router;
