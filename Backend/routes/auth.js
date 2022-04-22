const express = require("express");
const Users = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");
// https://www.npmjs.com/package/bcryptjs
const bcrypt = require("bcryptjs");
// https://www.npmjs.com/package/jsonwebtoken
const JWT_SECRET = "rohit_kumar";
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

//ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",

  
  [
    // https://express-validator.github.io/docs/
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", " Password must be atleast five charactors").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
    // If there are error, return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check wether the user with this email exists
    try {
      let user = await Users.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exist" });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = await bcrypt.hash(req.body.password, salt);

      /* This is creating a new user in the database. */
      user = await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    // https://express-validator.github.io/docs/
    body("email", "Enter a valid email").isEmail(),
    body("password", " Password can't be blank").exists(),
  ],

  async (req, res) => {
    // If there are error, return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await Users.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to connect with correct credential" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to connect with correct credential" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE 3: Get login User details using: POST "/api/auth/getuser". login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await Users.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
