import React, { useState } from "react"
import api from "../api/axios"

const Register: React.FC = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" })
  const [message, setMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await api.post("/auth/register", form)
      setMessage(res.data.message)
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Registration failed")
    }
  }
  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  )
}

export default Register