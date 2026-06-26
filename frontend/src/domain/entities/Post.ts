import type {User} from "./User";

export interface  Post {
    id: string;
    content: string;
    authorId:string;
    createdAt:string;
    author: Pick<User, "id"| "username" | "avatar">;
    _count:{
        likes: number;
    };
}