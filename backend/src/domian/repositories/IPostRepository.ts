import { Post, PostWithauthor} from "../entities/Post";

export interface CreatePostDTO {
    content: string;
    authorId: string;
}

export interface IPostRepository {
    findById(id: string): Promise<PostWithauthor| null>;
    findByAuthorId(authorId: string): Promise<PostWithauthor[]>;
    findnewsFeed(userId: string): Promise<PostWithauthor[] >;
    create(data: CreatePostDTO): Promise<PostWithauthor>;
    delete(id: string) : Promise<void>;
}