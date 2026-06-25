import prisma from "@infrastructure/database/prismaClient";

export class UnfollowUserUseCase{
    async execute(followerId: string, followingId:string): Promise<void>  {
        await prisma.follow.deleteMany({where:{ followerId,followingId},});
    }
}