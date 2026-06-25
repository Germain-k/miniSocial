import bcrypt from "bcryptjs";
import { IUserRepository } from "src/domain/repositories/IUserRepository";
import { PublicUser } from "src/domain/entities/User";

export interface RegisterInput {
    email: string;
    username: string;
    password: string;
}

export class RegisterUseCase{
    //injecter le usecase via le constructeur independamment de la bd
    constructor(private userRepository: IUserRepository) {}

    async execute(input: RegisterInput): Promise<PublicUser> {
        const existingEmail = await this.userRepository.findByEmail(input.email);
        if (existingEmail) {
            throw new Error("Email already in use");
        }

        //verifier que le username n'est pas déjà pris
        const existingUsername = await  this.userRepository.findByUsername(input.username);
        if (existingUsername){
            throw new Error("Username already taken"); 
        }
        //Hacher le mot de passe

        const hashedPassword = await bcrypt.hash(input.password,10);

        // Créer l'utilisateur
        const user = await this.userRepository.create({
            email:input.email,
            username: input.username,
            password: hashedPassword,
        });
        return user;
    }
}