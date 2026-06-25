import { Request,Response,NextFunction } from "express";
import { ZodSchema } from "zod";
import {z} from "zod"


//Middleware factory - prend un schema zod etretoure et schema zod

export const validate = (schema: ZodSchema) =>{
    return (req: Request,res: Response,next: NextFunction): void => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            //Zod retourne les erreurs des erreurs deteilles

            res.status(400).json({
                error: "Validation failed",
                details: result.error,      
            });
            return;
        }

        //Remplace req.body parles donnees validees et types
        req.body = result.data;
        next();
    };
};