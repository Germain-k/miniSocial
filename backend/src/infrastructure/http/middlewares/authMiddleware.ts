import { Request, Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import { error } from "node:console";

//On etend le type Request d'express pour ajouter userId
export interface AuthenticatedRequest extends Request {
    userId? :  string;
}

export  const authMiddleware=( 
    req: AuthenticatedRequest, 
    res: Response, 
    next:NextFunction): 
    void =>{
        // Recuperer le token dans le header Authorization
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({error: "No tokenprovided"});
            return;
        }
        // extraire les token (enlever Bearer)
        const token = authHeader.split(" ")[1];
        try{
            //verifier et decoder le token
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId: string};

            //Attacher userId a la requete pour les prochains middleware
            req.userId = decoded.userId;

            next(); //passer au prochain middleware ou controller
        } catch{
            res.status(401).json({error: "Invalid or expired token"});
        }
}; 


