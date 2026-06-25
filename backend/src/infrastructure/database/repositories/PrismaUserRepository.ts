import { IUserRepository, CreateUserDTO } from "@domain/repositories/IUserRepository";
import { User, PublicUser } from "@domain/entities/User";
import prisma from "../prismaClient";

export class PrismaUserRepository implements IUserRepository {

  async findById(id: string): Promise<PublicUser | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      // On exclut le password de la sélection
      select: {
        id: true,
        email: true,
        username: true,
        bio: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    // Ici on récupère TOUT, y compris le password (pour la vérification login)
    return prisma.user.findUnique({ where: { email } });
  }

  async findByUsername(username: string): Promise<PublicUser | null> {
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        email: true,
        username: true,
        bio: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });
    return user;
  }

  async create(data: CreateUserDTO): Promise<PublicUser> {
    const user = await prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        username: true,
        bio: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });
    return user;
  }

  async update(id: string, data: Partial<User>): Promise<PublicUser> {
    const user = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        username: true,
        bio: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });
    return user;
  }
}
