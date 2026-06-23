import { SpawnSyncOptionsWithStringEncoding } from "node:child_process";

export interface User{
    id: string;
    emai: string;
    username: string;
    password: String;
    bio?: string;
    avatar?: string;
    createdAt : Date;
    updatedAt : Date;
}

//Version sans le mot de passe pour les reponses API

export type PublicUser = Omit<User, "password">;