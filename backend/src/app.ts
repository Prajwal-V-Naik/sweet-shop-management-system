const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

connectDB()

// Routes here import and use
const authRoutes = require("./routes/authRoutes")
app.use("/api/auth", authRoutes)
 
app.get("/", (req, res) => {
  res.json({ message: "API running" })
});

// const PORT = process.env.PORT || 5000
// app.listen(PORT, ()=>console.log(`Server running at port: ${PORT}`))

module.exports = app