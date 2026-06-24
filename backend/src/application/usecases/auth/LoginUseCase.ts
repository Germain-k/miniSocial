import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUserRepository } from "src/domian/repositories/IUserRepository";

export interface LoginInput {
    email : string;
    password: string;
}

export interface LoginOutput {
    token: string;
    user: {
        id: string;
        email: string;
        username: string;
    };
}

export class LoginUseCase {
    constructor(private userRepository :IUserRepository){}

    async execute(input: LoginInput): Promise<LoginOutput> {
       
        // trouver l'utilisateur par son email (avec le mot de passe)
        const user = await this.userRepository.findByEmail(input.email);
        if (!user){
            //message volontairement vague pour ne pas indiquer si l'email  existe
            throw new Error("Invalid credentials");
        }

        //verifier le mot de passe
        const  isPasswordValid = await bcrypt.compare(input.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid  credentials");
        }

        //Generer le token JWT
        const secret = process.env.JWT_SECRET!;
        const expiresIn = process.env.JWT_EXPIrES_IN || "7d";

        const token = jwt.sign({userId: user.id},secret,{expiresIn} as jwt.SignOptions);

        return{ 
            token,
            user: {
            id:user.id,
            email:user.email,
            username:  user.username,
        },
    };
    }
}