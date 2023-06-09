import { PrismaClient, User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { Friendship, FriendshipStatus, UserProfile } from '@prisma/client';
import { Request } from 'express';

interface FriendshipUpdateData {
  status: FriendshipStatus;
  user_id?: number;
  friend_id?: number;
}

@Injectable()
export class FriendsService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async getFriendsList(req: Request) {
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

  async getFriendsByStatus(req: Request, status: "REQUESTED" | "BLOCKED") {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: { email: req.user["email"] },
      });

      const friends = await this.prisma.friendship.findMany({
        where: {
          [status === "REQUESTED" ? "friend_id" : "user_id"]: user.id,
          status: status,
        },
      });

      const friendIds = friends.map((element) =>
        status === "REQUESTED" ? element.user_id : element.friend_id
      );

      const profileFriends = await this.prisma.userProfile.findMany({
        where: {
          user_id: { in: friendIds },
        },
        select: {
          user_id: true,
          avatar: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      });

      return profileFriends;
    } catch (error) {
      console.error("An error occurred:", error);
      return {
        message: "An error occurred",
      };
    }
  }
  async addFriend(req: Request, username: string) {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: { email: req.user["email"] },
      });
      const friendProfile : UserProfile = await this.prisma.userProfile.findUnique({
         where: { username } 
      });
      if (!friendProfile || friendProfile.user_id === user.id) {
        return { message: "User not found" };
      }
      const friendship : Friendship = await this.prisma.friendship.findFirst({
        where: {
          OR: [
            { user_id: user.id, friend_id: friendProfile.user_id },
            { user_id: friendProfile.user_id, friend_id: user.id },
          ],
        },
      });
      if (!friendship) {
        await this.prisma.friendship.create({
          data: {
            user_id: user.id,
            friend_id: friendProfile.user_id,
            status: "REQUESTED",
          },
        });
      } else if (friendship.status === "NOTFRIENDS") {
        const updateData: FriendshipUpdateData = {
          status: "REQUESTED",
        };
  
        if (friendship.user_id !== user.id) {
          updateData.user_id = user.id;
          updateData.friend_id = friendProfile.user_id;
        }
  
        await this.prisma.friendship.update({
          where: {
            id: friendship.id,
          },
          data: updateData,
        });
      } else {
        return { message: "You can't add this user" };
      }
  
      return { message: "The request is sent" };
    } catch (error) {
      console.error("An error occurred:", error);
      return { message: "An error occurred" };
    }
  }
}
