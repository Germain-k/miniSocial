import { Request,Response } from "express";
import {z} from "zod";
import { RegisterUseCase } from "@application/usecases/auth/RegisterUseCase";
import { LoginUseCase } from "@application/usecases/auth/LoginUseCase";
import { PrismaUserRepository } from "@infrastructure/database/repositories/PrismaUserRepository";

// schema de validation zod

export const registerSchema = z.object({
    email:z.string().email("Invalid email"),
    username: z.string().min(3, "Username must be at least 3 charcters").max(20),
    password: z.string().min(6, "Password must  be at least  6characters"),
});
 export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
 });

 //Instancce du  repository (sera injecté dans les use cases)

 const useRepository = new PrismaUserRepository();

 export const register = async (req:Request, res: Response): Promise<void> =>{
    try {
        const useCase = new RegisterUseCase(useRepository);
        const user = await useCase.execute(req.body);
        res.status(201).json({user});
    } catch  (error){
        if (error instanceof Error) {
            res.status(400).json({ error: error.message});
        }else{
            res.status(500).json({error: "internal  server error"});
        }
    }
 };

 export const login= async(req: Request, res: Response): Promise<void> => {
    try{
        const useCase = new LoginUseCase(useRepository);
        const result = await useCase.execute(req.body);
        res.json(result);
    }catch(error){
        if(error instanceof Error){
            res.status(401).json({error: error.message});
        }else{
            res.status(500).json({error: "internal server error"});
        }
    }
 };