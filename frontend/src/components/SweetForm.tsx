import React, { useState } from "react"
import api from "../api/axios"

const SweetForm: React.FC<{ onAdded: () => void }> = ({ onAdded }) => {
  const [form, setForm] = useState({ name: "", category: "", price: 0, quantity: 0 })
  const [message, setMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post("/sweets", form)
      setMessage("Sweet added successfully!")
      onAdded()
      setForm({ name: "", category: "", price: 0, quantity: 0 })
    } catch {
      setMessage("Error adding sweet")
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input name="name" placeholder="Name" onChange={handleChange} value={form.name} />
      <input name="category" placeholder="Category" onChange={handleChange} value={form.category} />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} value={form.price} />
      <input name="quantity" type="number" placeholder="Quantity" onChange={handleChange} value={form.quantity} />
      <button type="submit">Add Sweet</button>
      <p>{message}</p>
    </form>
  )
}

export default SweetForm