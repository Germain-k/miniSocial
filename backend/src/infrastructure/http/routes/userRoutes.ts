import { Router } from "express";
import { followUser, unfollowUser,getUserProfile } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/username", authMiddleware,getUserProfile);
router.post(":id/follow", authMiddleware,followUser);
router.delete("/:id/follow", authMiddleware, unfollowUser);

export default router;