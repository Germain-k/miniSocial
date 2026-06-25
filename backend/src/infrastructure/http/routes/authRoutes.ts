import { Router } from "express";
import {register,login,  registerSchema, loginSchema } from  "../controllers/authController";
import {validate} from "../middlewares/validate";

const router = Router();

//Post/api/auth/register
router.post("/register",validate(registerSchema), register);

//Post / api/auth/login
router.post("/login",validate(loginSchema),login);

export default router;