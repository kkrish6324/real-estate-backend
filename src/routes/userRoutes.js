import { Router } from "express";
import {
  getMe,
  loginUser,
  logoutUser,
  refreshUserToken,
  registerUser,
} from "../controllers/userController.js";
import { requireUserAuth } from "../middleware/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshUserToken);
router.post("/logout", logoutUser);
router.get("/me", requireUserAuth, getMe);

export default router;
