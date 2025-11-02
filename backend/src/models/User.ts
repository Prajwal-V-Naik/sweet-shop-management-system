const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

type IUser = {
  username: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
};

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true })


userSchema.pre("save", async function (this: any, next: () => void) {
  if (!this.isModified("password")) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

const User = mongoose.model("User", userSchema)
module.exports = User
