import { SpawnSyncOptionsWithStringEncoding } from "node:child_process";

export interface User{
    id: string;
    email: string;
    username: string;
    password: string;
    bio?: string;
    avatar?: string;
    createdAt : Date;
    updatedAt : Date;
}

//Version sans le mot de passe pour les reponses API

export type PublicUser = Omit<User, "password">;