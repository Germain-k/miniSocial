import {Router} from "express";
import { createPost, deletePost, getFeed, createPostSchema } from "../controllers/postController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";

const router = Router();

// toutes ces routes nécessitent d'être authentifié
router.use(authMiddleware);

router.get("/feed", getFeed);
router.post("/", validate(createPostSchema), createPost);
router.delete("/:id", deletePost);

export default router;   