const Item = require("../models/itemsModel");
const mongoose = require('mongoose');


// GET request handler
const getItem = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST request handler
const addItem = async (req, res) => {
  const highlights = req.body.highlights.split(",");
  const size = req.body.size.split(",");

  const item = {
    name: req.body.name,
    category: req.body.category,
    type: req.body.type,
    color: req.body.color,
    description: req.body.description,
    price: req.body.price,
    image: req.files,
    size: size,
    highlights: highlights,
    detail: req.body.detail,
  };

  try {
    await Item.create(item);
    res.status(201).json({ message: "Item added successfully" });
  } catch (error) {
    res.status(400).json({ message: "Unable to add item" });
  }
};

// PUT request handler

const updateItem = async (req, res) => {
    const itemId = req.params.id;
  
    try {
      const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, {
        new: true,
      });
  
      if (updatedItem) {
        res.json(updatedItem);
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

// DELETE request handler
const deleteItem = async (req, res) => {
const itemId = req.params.id;

try {
    const deletedItem = await Item.findByIdAndDelete(itemId);

    if (deletedItem) {
res.json({ message: "Item deleted successfully" });
    } else {
 res.status(404).json({ message: "Item not found" });
    }
} catch (error) {
    res.status(500).json({ message: "Internal server error" });

}
};




const getItemById = async (req, res) => {
    let itemId = req.params.id;

    // Remove leading colon if present
    if (itemId.startsWith(':')) {
        itemId = itemId.substring(1);
    }

    // Check if itemId is a valid ObjectId
    if (!mongoose.isValidObjectId(itemId)) {
        return res.status(400).json({ message: 'Invalid ObjectId' });
    }

    try {
        const item = await Item.findById(itemId);

        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error' });
    }
};


  
  module.exports = {
    getItem,
    addItem,
    updateItem,
    deleteItem,
    getItemById, // Make sure to include getItemById in the exported object
  };