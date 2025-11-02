const express = require("express")
const auth = require("../middlewares/authMiddleware")
const { addSweet, getSweets, updateSweet, deleteSweet } = require("../controllers/sweetController")

const router = express.Router()

router.use(auth)

router.post("/", addSweet)
router.get("/", getSweets)
router.put("/:id", updateSweet)
router.delete("/:id", deleteSweet)

module.exports = router