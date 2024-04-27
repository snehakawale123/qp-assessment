import express from "express";
import { viewGroceryItems, bookItems } from "../controllers/userController.js";
const router = express.Router();
router.get("/view-items", viewGroceryItems);
router.post("/book-items", bookItems);
export default router;
//# sourceMappingURL=userRoutes.js.map