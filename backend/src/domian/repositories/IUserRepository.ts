import { User, PublicUser } from "../entities/User";

export interface CreateUserDTO {
    email : string;
    username : string;
    password : string;
}

export interface IUserRepository {
    findById(id:string) : Promise<PublicUser | null>;
    findByEmail(email: string): Promise<PublicUser | null>;
    create(data:CreateUserDTO): Promise<PublicUser>;
    update(id: string, data: Partial<User>): Promise<PublicUser>;
}