const express = require("express");
const router = express.Router();
const cors = require("cors");
const uploadPhoto = require("../middlewares/upload");
const { getItem, addItem, updateItem, deleteItem, getItemById } = require("../controllers/itemsController");
router.use(cors());
router.get("/", getItem);
router.post("/", addItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);
router.get("/:id", getItemById);

module.exports = router;
