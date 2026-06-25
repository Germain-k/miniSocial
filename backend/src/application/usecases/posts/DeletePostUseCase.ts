import { IPostRepository } from "@domain/repositories/IPostRepository";

export class DeletePostUseCase {
    constructor(private postRepository:  IPostRepository){}

    async execute(postId:  string, userId: string): Promise<void> {
        const post = await this.postRepository.findById(postId);

        if (!post) {
            throw  new Error("Post not Found");
        }
        // verifier que c'est bien l'auteur qui supprime
        if (post.authorId !== userId){
            throw new Error("Unauthorized - Can only delete your own posts");
        }

        await this.postRepository.delete(postId);
    }
}