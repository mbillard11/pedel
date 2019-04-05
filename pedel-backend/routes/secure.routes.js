const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const UserModel = require('../model/user')

router.get('/userData', (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (!user) res.json({ message: 'user not found' })
    /* send user data to frontend */
        res.json({
          username: user.username,
          email: user.email,
          type: user.type,
          favourite_book: user.favourite_book,
          favourite_genre: user.favourite_genre,
          num_books_read: user.num_books_read,
          read_time: user.read_time
        });
    })(req, res, next);
})


router.put("/userData", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (err, user, info) => {
        if (!user) res.json({ message: "user not found" });
         let updatedUser = await UserModel.user
           .update(
             {
               username: req.body.username,
               favourite_book: req.body.favourite_book,
               favourite_genre: req.body.favourite_genre,
               num_books_read: req.body.num_books_read,
               read_time: req.body.read_time
             },
             { where: { email: user.email } }
           )
           .then(res => {
             return UserModel.user
               .findOne({
                 where: {
                   email: user.email
                 }
               })
               .then(res => {
                 return JSON.parse(JSON.stringify(res));
               });
           });
      const updatedData = {
        type: updatedUser.type,
        username: updatedUser.username,
        favourite_book: updatedUser.favourite_book,
        favourite_genre: updatedUser.favourite_genre,
        num_books_read: updatedUser.num_books_read,
        read_time: updatedUser.read_time
        }
      
      res.json({ message: "user updated", data: updatedData });
    })(req, res, next);
});

module.exports = router