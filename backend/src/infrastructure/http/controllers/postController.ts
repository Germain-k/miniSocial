import { Response } from "express";
import {z} from "zod";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { PrismaPostRepository } from "@infrastructure/database/repositories/PrismaPostRepository";
import { CreatePostUseCase } from "@application/usecases/posts/CreatePostUseCase";
import { DeletePostUseCase } from "@application/usecases/posts/DeletePostUseCase";

export const createPostSchema = z.object({
    content: z.string().min(1).max(280),
});

const postRepository = new PrismaPostRepository();

export const createPost = async(req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const useCase = new CreatePostUseCase(postRepository); 
        const post = await useCase.execute({
            content:req.body.content,
            authorId: req.userId!,
        });
        res.status(201).json({post});
    }catch (error) {
        if (error instanceof Error) {
            res.status(400).json({error: error.message});
        } else {
            res.status(500).json({error: "Internal server error"});
        }
    }
};

export const deletePost = async(req : AuthenticatedRequest, res: Response): Promise<void> => {
    try{
        const useCase = new DeletePostUseCase(postRepository);
        await useCase.execute(req.params.id as string, req.userId!);
        res.status(204).send(); // succes sans corps de reponse 
    } catch(error){
        if(error instanceof Error){
            const status = error.message.includes("Unauthorized") ? 403 : 404;
            res.status(status).json({error: error.message});
        } else {
            res.status(500).json({error: "Internal server error"});
        }
    }
    
};

export const getFeed = async ( req: AuthenticatedRequest,res: Response) : Promise<void>=> {
    try {
        const posts = await postRepository.findnewsFeed(req.userId!);
        res.json({ posts });
    }catch{
        res.status(500).json({error: "Internal server error"});
    }
}; 