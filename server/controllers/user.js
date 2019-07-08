const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const {
  registerValidation,
  loginValidation
} = require("../validation/validation");
const jwt = require("jsonwebtoken");

module.exports = {
  index: async (req, res, next) => {
    await User.find({}, (err, users) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(users);
      }
    }).select("-password");
  },
  registerUser: async (req, res, next) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if user already exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");

    //Hash pw
    const salt = await bcryptjs.genSaltSync(10);
    const hashPassword = await bcryptjs.hashSync(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword
    });
    try {
      const savedUser = await user.save();
      res.status(201).send({ user: user._id });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  loginUser: async (req, res, next) => {
    try {
      const { error } = loginValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      //Check if email exist
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).send("Email or password is incorrect");

      //Valid pw
      const validPass = await bcryptjs.compareSync(
        req.body.password,
        user.password
      );
      if (!validPass)
        return res.status(400).send("Email or password is incorrect");

      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res.header("auth-token", token).send(token);
    } catch (error) {
      console.log({ error: error });
    }
  }
};
