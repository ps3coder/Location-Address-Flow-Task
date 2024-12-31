import express from "express";
import {
  getAddress,
  updateAddress,
  deleteAddress,
  addAddress,
  getAllAddress,
} from "../controllers/addressController.js";
const router = express.Router();

router.get("/:id", getAddress);
router.get("/", getAllAddress);
router.post("/add", addAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

export default router;
