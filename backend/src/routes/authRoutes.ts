const express = require("express")
const {body} = require("express-validator")
const { registerUser } = require("../controllers/authController")

const router = express.Router()

router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  registerUser
)

module.exports = router
