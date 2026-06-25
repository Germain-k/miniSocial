import { IPostRepository } from "@domain/repositories/IPostRepository";
import { PostWithAuthor } from "@domain/entities/Post";
import { throwDeprecation } from "node:process";

export interface CreatePostInput {
    content: string;
    authorId: string;
}

export class CreatePostUseCase {
    constructor(private postRepository: IPostRepository){}

    async execute(input: CreatePostInput): Promise<PostWithAuthor> {
        if (!input.content.trim()) {
            throw new Error("Post content cannot be empty");
        }

        if (input.content.length > 280) {
            throw new Error("Post content cannot exceed 280 characters");
        }

        return this.postRepository.create(input);
    }
}