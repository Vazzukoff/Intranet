import { Router } from "express";

import {
  deleteCurrentUser,
  findUsername,
  getCurrentUser,
  updateCurrentUser,
} from "@/controllers/user.controller";
import { authenticateToken } from "@/middleware/auth.middleware";

const router = Router();

router.get("/me", authenticateToken, getCurrentUser);
router.patch("/me", authenticateToken, updateCurrentUser);
router.delete("/me", authenticateToken, deleteCurrentUser);
router.post("/findEmail", findUsername);

export default router;