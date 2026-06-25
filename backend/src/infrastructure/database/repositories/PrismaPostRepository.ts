import { CreatePostDTO, IPostRepository } from "@domain/repositories/IPostRepository";
import {PostWithAuthor} from "@domain/entities/Post";
import prisma from "../prismaClient";

//Selection reutilisable pour inclure l'auteur et le nombre de likes
const postSelect= {
    id: true,
    content: true,
    authorId: true,
    createdAt:  true,
    updatedAt: true,
    author:{
        select:{
            id: true,
            username: true,
            avatar: true,
            email: true,
            bio: true,
            createdAt: true,
            updatedAt: true,
        },
    },
    _count:{
        select:{ likes: true},
    },
};

export class PrismaPostRepository implements IPostRepository {
    async findById(id: string): Promise<PostWithAuthor | null> {
        return prisma.post.findUnique({ where: {id}, select: postSelect}) as Promise<PostWithAuthor | null>;
    }

    async findByAuthorId(authorId: string): Promise<PostWithAuthor[]> {
        return prisma.post.findMany({
            where: {authorId},
            select: postSelect,
            orderBy:{createdAt:"desc"},
        }) as Promise<PostWithAuthor[]>;
    }

    async findnewsFeed(userId: string): Promise<PostWithAuthor[]> {
        //on recupere les post des utilisateurs que userId suit
        return prisma.post.findMany({
            where: {
                author: {
                    followers:{
                        some: {followerId: userId},
                    },
                },
            },
            select: postSelect,
            orderBy: { createdAt: "desc"},
            take: 50,
        }) as Promise<PostWithAuthor[]>;
    }

    async create(data: CreatePostDTO): Promise<PostWithAuthor> {
        return prisma.post.create({
            data,
            select: postSelect,
        })as Promise<PostWithAuthor>;
    }

    async delete(id: string): Promise<void> {
        await prisma.post.delete({where:  {id}});
    }

}