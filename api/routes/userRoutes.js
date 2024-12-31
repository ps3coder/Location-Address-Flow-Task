import express from "express";
import {
  createUser,
  getUser,
  getAllUser,
  deleteUser,
  loginUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUser);
router.post("/login", loginUser);
router.post("/add", createUser);
router.route("/:id").get(getUser).delete(deleteUser);
export default router;
