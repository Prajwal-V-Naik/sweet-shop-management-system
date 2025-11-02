import React, { useEffect, useState } from "react";
import api from "../api/axios";
import SweetCard from "../components/SweetCard";
import SweetForm from "../components/SweetForm";
import { Sweet } from "../types/Sweet";

const Dashboard: React.FC = () => {
  const [sweets, setSweets] = useState<Sweet[]>([])
  const [search, setSearch] = useState("")
  const [userRole, setUserRole] = useState("user")

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserRole(user.role || "user")
    fetchSweets()
  }, [])

  const fetchSweets = async () => {
    const res = await api.get("/sweets")
    setSweets(res.data.sweets)
  }

  const handlePurchase = async (id: string) => {
    await api.post(`/sweets/${id}/purchase`)
    fetchSweets()
  }

  const handleDelete = async (id: string) => {
    await api.delete(`/sweets/${id}`)
    fetchSweets()
  }

  const filtered = sweets.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🍬 Sweet Dashboard</h2>

        <h3>Add Sweets:</h3>
        <div className="mb-4">
          <SweetForm onAdded={fetchSweets} />
        </div>


      <input
        className="border p-2 rounded mb-4 w-full sm:w-1/2"
        placeholder="Search sweets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((sweet) => (
          <SweetCard
            key={sweet._id}
            sweet={sweet}
            onPurchase={handlePurchase}
            onDelete={handleDelete}
            userRole={userRole}
          />
        ))}
      </div>
    </div>
  )
}

export default Dashboard