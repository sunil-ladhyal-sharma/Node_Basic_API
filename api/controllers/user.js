const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Signup controller
exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((doc) => {
      console.log(doc, doc.length);
      if (doc.length < 1) {
        console.log("email not exists - proceed creation of user");
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log(err);
            res.status(500).json(err);
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });

            user
              .save()
              .then((result) => {
                console.log(result);
                res
                  .status(200)
                  .json({
                    type: "GET",
                    base_url: "http://localhost:300",
                    end_point: "signup",
                    result: result,
                  });
              })
              .catch((error) => {
                console.log(error);
                res.status(500).json(error);
              });
          }
        });
      } else {
        console.log("we can't proceed because user's already exists");

        res
          .status(409)
          .json({ error: "we can't proceed because user's already exists" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

// User login controller
exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      console.log(user);
      if (user.length >= 1) {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                id: user[0]._id,
              },
              process.env.TOKEN_SECRET_KEY,
              {
                expiresIn: "1hr",
              }
            );
            console.log(token);
            res
              .status(200)
              .json({
                type: "GET",
                end_point: "login",
                base_url: "http://localhost:3000",
                result: "Auth Successfull",
                token: token,
              });
          } else {
            res
              .status(401)
              .json({
                type: "GET",
                end_point: "login",
                base_url: "http://localhost:3000",
                result: "UnAuthorised ",
              });
          }

          if (err) {
            res.status(500).json(error);
          }
        });
      } else {
        res
          .status(401)
          .json({
            type: "GET",
            end_point: "login",
            base_url: "http://localhost:3000",
            result: "UnAuthorised ",
          });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
