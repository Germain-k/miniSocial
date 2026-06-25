import { Post, PostWithAuthor} from "../entities/Post";

export interface CreatePostDTO {
    content: string;
    authorId: string;
}

export interface IPostRepository {
    findById(id: string): Promise<PostWithAuthor| null>;
    findByAuthorId(authorId: string): Promise<PostWithAuthor[]>;
    findnewsFeed(userId: string): Promise<PostWithAuthor[] >;
    create(data: CreatePostDTO): Promise<PostWithAuthor>;
    delete(id: string) : Promise<void>;
} 