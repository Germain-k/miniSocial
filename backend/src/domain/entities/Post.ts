import {PublicUser} from "./User";

export interface Post {
    id :string;
    content : string;
    authorId: string;
    createdAt: Date;
    updatedAt:Date;
}

export interface PostWithAuthor extends Post {
    author: PublicUser;
    _count:{
        likes:number;
    };
}