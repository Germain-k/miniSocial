import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { FolllowUserUserCase } from "@application/usecases/users/FollowUserUseCase";
import { UnfollowUserUseCase } from "@application/usecases/users/UnfollowUserUseCase";
import prisma from "@infrastructure/database/prismaClient";
import { error } from "node:console";

export const followUser = async(req: AuthenticatedRequest, res: Response): Promise<void> =>{
    try{
        const useCase = new FolllowUserUserCase();
        await useCase.execute(req.userId!, req.params.id as string);
        res.json({  message: "User followed successfully"});
    }catch(error){
         if (error instanceof Error){
            res.status(400).json({error:error.message});
         }else{
            res.status(500).json({error:"Internal server error"});
         }
    }
};

export const unfollowUser = async (req:AuthenticatedRequest, res : Response): Promise<void> => {
    try{
        const useCase = new UnfollowUserUseCase();
        await useCase.execute(req.userId!,req.params.id as string);
        res.json({ message: "User  unfollowed successfully"});
    }catch{
        res.status(500).json({error: "Internal server error"});
    }
};

export const getUserProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> =>{
    try{
        const user = await prisma.user.findUnique({
            where: { username: req.params.username as string},
            select:{
                id: true,
                username: true,
                bio: true,
                avatar:true,
                createdAt: true,
                _count: {
                    select:{
                        posts: true,
                        followers:true,
                        following: true,
                    },
                },
            },
        });

        if (!user) {
            res.status(404).json({error: "User not found"});
            return;
        }
        res.json({user});
    } catch{
        res.status(500).json({error: "Internal server error"});
    }
};