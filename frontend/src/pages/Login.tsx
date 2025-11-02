import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" })
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await api.post("/auth/login", form)
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))
      navigate("/dashboard")
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="p-4">
      <h2 className="font-bold uppercase">Login</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded-md flex flex-col gap-4 justify-start items-start w-fit mt-4">
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} />
        <button className="border px-2 rounded-sm bg-green-400 hover:text-white" type="submit">Login</button>
      </form>
      <p className="text-red-300 ml-1 mt-2">{message}</p>
    </div>
  )
}

export default Login