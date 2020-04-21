const jwt = require("jsonwebtoken");
const User = require("../models/User");
const MongooseHelpers = require("../helpers/mongoose");
const config = require("../config");
exports.auth = (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    return res
      .status(422)
      .send({ title: "Data Missing", detail: "Provide email and password" });
  }
  User.findOne({ email }, (err, user) => {
    if (err) {
      return res
        .status(422)
        .send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
    }
    if (!user) {
      return res
        .status(422)
        .send({ title: "Invalid User", detail: "User does not exist" });
    }
    if (user.hasSamePassword(password)) {
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
        },
        config.SECRET,
        { expiresIn: "1h" }
      );
      return res.json(token);
    } else {
      return res
        .status(422)
        .send({ title: "Wrong Data", detail: "Wrong Email or Password" });
    }
  });
};

exports.register = (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;
  if (!password || !email) {
    return res
      .status(422)
      .send({ title: "Data Missing", detail: "Provide email and password" });
  }
  if (password !== passwordConfirmation) {
    return res
      .status(422)
      .send({ title: "Data Missing", detail: "Provide Same password please" });
  }

  User.findOne({ email }, (err, isExistUser) => {
    if (err)
      res
        .status(422)
        .send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
    if (isExistUser) {
      return res
        .status(422)
        .send({
          errors: [{ title: "Invalid email", detail: "User Already Exist" }],
        });
    }
    const user = new User({ username, email, password });
    user.save((err) => {
      if (err) {
        if (err)
          return res
            .status(422)
            .send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
      }
      return res.json({ registered: true });
    });
  });

  // res.json({username,email})
};

exports.authMiddleware = function (req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    const user = parseToken(token);
    User.findById(user.userId, function (err, user) {
      if (err) {
        return res
          .status(422)
          .send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
      }
      if (user) {
        res.locals.user = user;
        next();
      } else {
        return res
          .status(422)
          .send({
            errors: [
              {
                title: "Not Authorized",
                detail: "You need to login to get access",
              },
            ],
          });
      }
    });
  } else {
    return res
      .status(422)
      .send({
        errors: [
          {
            title: "Not Authorized",
            detail: "You need to login to get access",
          },
        ],
      });
  }
};

function parseToken(token) {
  return jwt.verify(token.split(" ")[1], config.SECRET);
}
