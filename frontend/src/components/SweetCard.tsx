import React from "react";
import { Sweet } from "../types/Sweet";

interface Props {
  sweet: Sweet
  onPurchase: (id: string) => void
  onDelete: (id: string) => void
  userRole: string
}

const SweetCard: React.FC<Props> = ({ sweet, onPurchase, onDelete, userRole }) => {
  return (
    <div className="border rounded-xl shadow-md p-4 bg-white flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold">{sweet.name}</h3>
        <p className="text-gray-600">Category: {sweet.category}</p>
        <p>Price: ₹{sweet.price}</p>
        <p>Quantity: {sweet.quantity}</p>
      </div>

      <div className="flex justify-between mt-3">
        <button
          onClick={() => onPurchase(sweet._id!)}
          disabled={sweet.quantity <= 0}
          className={`px-4 py-1 rounded text-white ${
            sweet.quantity > 0 ? "bg-green-500 hover:bg-green-600" : "bg-gray-400"
          }`}
        >
          {sweet.quantity > 0 ? "Buy" : "Out of stock"}
        </button>

          <button
            onClick={() => onDelete(sweet._id!)}
            className="px-4 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </button>
      </div>
    </div>
  )
}

export default SweetCard