import prisma from "@infrastructure/database/prismaClient";

 export class FolllowUserUserCase {
    async execute(followerId: string, followingId: string): Promise<void> {
        if (followerId === followingId){
            throw new Error(" You cannot follow yourself");
        }

        // Verifier que l'utilisateur a suivre existe
        const userToFollow = await prisma.user.findUnique({ where: {id: followingId}});
        if (!userToFollow) {
            throw new Error("User not Found");
        }

        //Creer la relation (@@unique)
        await prisma.follow.create({
            data: { followerId, followingId },
        });
    }
 }