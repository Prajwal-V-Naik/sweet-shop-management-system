const User = require("../models/User")

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields are required" })

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