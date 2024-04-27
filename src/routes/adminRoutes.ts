import express from "express";
import {
  addGroceryItem,
  getGroceryItems,
  removeGroceryItem,
  updateGroceryItem,
  manageInventory,
} from "../controllers/adminController.js";

const router = express.Router();
router.use(express.json());
router.post("/add-item", addGroceryItem);
router.get("/view-items", getGroceryItems);
router.delete("/remove-item/:itemId", removeGroceryItem);
router.put("/update-item/:itemId", updateGroceryItem);
router.put("/manage-inventory/:itemId", manageInventory);

export default router;
