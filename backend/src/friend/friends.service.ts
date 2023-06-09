import { PrismaClient, User } from '.prisma/client';
import { Injectable, Req } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class FriendsService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async getFriends(req: Request) {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: { email: req.user["email"] },
      });

      const [friends1, friends2] = await Promise.all([
        this.prisma.friendship.findMany({
          where: {
            user_id: user.id,
            status: "FRIENDS"
          }
        }),
        this.prisma.friendship.findMany({
          where: {
            friend_id: user.id,
            status: "FRIENDS"
          }
        })
      ]);

      const friendIds = [
        ...friends1.map(element => element.friend_id),
        ...friends2.map(element => element.user_id)
      ];

      const profileFriends = await this.prisma.userProfile.findMany({
        where: {
          user_id: { in: friendIds }
        },
        select: {
          user_id: true,
          avatar: true,
          firstName: true,
          lastName: true,
          username: true,
        }
      });

      return profileFriends;
    } catch (error) {
      console.error("An error occurred:", error);
      return {
        message: "An error occurred",
      };
    }
  }

  async getFriendRequests(req: Request) {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: { email: req.user["email"] },
      });

      const friendRequests = await this.prisma.friendship.findMany({
        where: {
          friend_id: user.id,
          status: "REQUESTED"
        }
      });

      const friendIds = friendRequests.map(element => element.user_id);

      const profileFriends = await this.prisma.userProfile.findMany({
        where: {
          user_id: { in: friendIds }
        },
        select: {
          user_id: true,
          avatar: true,
          firstName: true,
          lastName: true,
          username: true,
        }
      });

      return profileFriends;
    } catch (error) {
      console.error("An error occurred:", error);
      return {
        message: "An error occurred",
      };
    }
  }
}
