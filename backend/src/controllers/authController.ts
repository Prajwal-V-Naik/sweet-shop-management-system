const User = require("../models/User")
const { validationResult } = require("express-validator")

const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation failed", errors: errors.array() })
    }

    const { username, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res.status(400).json({ message: "User already exists" })

    // Creating user
    const newUser = new User({ username, email, password })
    await newUser.save()

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: "Server error" })
  }
};

module.exports = { registerUser }