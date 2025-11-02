const Sweet = require("../models/Sweet");

// POST /api/sweets
const addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body
    const existing = await Sweet.findOne({ name })
    if (existing) return res.status(400).json({ message: "Sweet already exists" })

    const sweet = new Sweet({ name, category, price, quantity })
    await sweet.save()
    res.status(201).json({ message: "Sweet added successfully", sweet })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
};

// GET /api/sweets
const getSweets = async (_req, res) => {
  try {
    const sweets = await Sweet.find()
    res.status(200).json({ sweets })
  } catch {
    res.status(500).json({ message: "Server error" })
  }
}

// PUT /api/sweets/:id
const updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!sweet) return res.status(404).json({ message: "Sweet not found" })
    res.status(200).json({ message: "Sweet updated", sweet })
  } catch {
    res.status(500).json({ message: "Server error" })
  }
};

// DELETE /api/sweets/:id
const deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id)
    if (!sweet) return res.status(404).json({ message: "Sweet not found" })
    res.status(200).json({ message: "Sweet deleted" })
  } catch {
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = { addSweet, getSweets, updateSweet, deleteSweet }