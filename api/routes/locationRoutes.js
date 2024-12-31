import express from "express";
import {
  getAllLocation,
  getLocation1,
  saveAddress,
  deleteLocation,
} from "../controllers/locationController.js";

const router = express.Router();

router.get("/geo", getLocation1);
router.get("/", getAllLocation);
router.post("/", saveAddress);
router.delete("/:_id", deleteLocation);

export default router;
