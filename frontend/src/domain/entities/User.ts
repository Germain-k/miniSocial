export interface User {
    id: string;
    email: string;
    username: string;
    bio?: string;
    avatar?: string;
    createdAt: string;
}

export interface  AuthUser {
    token: string;
    user: Pick<User, "id" | "email" | "username">;
} 