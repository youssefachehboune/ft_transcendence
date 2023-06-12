import { PrismaClient, User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { Friendship, FriendshipStatus, UserProfile } from '@prisma/client';
import { Request } from 'express';
import { NotificationService, NotificationType } from 'src/notification/notification.service';

export interface FriendshipUpdateData {
  status?: FriendshipStatus;
  user_id?: number;
  friend_id?: number;
}

export enum Status {
  REQUEST = 'REQUEST',
  ACCEPT = 'ACCEPT',
  REJECT = 'REJECT',
  BLOCK = 'BLOCK',
  UNBLOCK = 'UNBLOCK',
  UNFRIEND = 'UNFRIEND',
  REMOVE = 'REMOVE',
}

@Injectable()
export class FriendsService {
  private readonly prisma: PrismaClient;

  constructor(private readonly notificationService: NotificationService) {
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

  async getFriendsCount(username: string) : Promise<number | { message: string }>
  {
    try {
      const userProfile: UserProfile = await this.prisma.userProfile.findUnique({
        where: { username: username },
      });
      if (!userProfile) {
        return { message: "User Not Found" };
      }
      const friendsCount: number = await this.prisma.friendship.count({
        where: {
          OR: [
            { user_id: userProfile.user_id, status: "FRIENDS" },
            { friend_id: userProfile.user_id, status: "FRIENDS" },
          ],
        },
      });
      return friendsCount;
    }
    catch (error) {
      console.error("An error occurred:", error);
      return {
        message: "An error occurred",
      };
    }
  }
  async getFriendshipStatus(req: Request, username: string) {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: { email: req.user["email"] },
      });
      const friendProfile: UserProfile = await this.prisma.userProfile.findUnique({
        where: { username: username },
      });
      if (!friendProfile) {
        return { message: "User Not Found" };
      }
      const friendship: Friendship = await this.prisma.friendship.findFirst({
        where: {
          OR: [
            { user_id: user.id, friend_id: friendProfile.user_id },
            { user_id: friendProfile.user_id, friend_id: user.id },
          ],
        },
      });
      if (!friendship || friendProfile.user_id === user.id) {
        return "NONE";
      }
      if (friendship.status === "REQUESTED") {
        if (friendship.user_id === user.id) {
          return "SentRequest";
        } else {
          return "ReceivedRequest";
        }
      }
      else
      {
        return friendship.status;
      }
    }
    catch (error) {
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

  async UpdateStatusFromRequest(req: Request, status: Status, user: User, friendProfile: UserProfile, friendship: Friendship): Promise<FriendshipUpdateData | { message: string }> {
    let updateData: FriendshipUpdateData = {};
    if (friendship.user_id !== user.id) {
      updateData.user_id = user.id;
      updateData.friend_id = friendProfile.user_id;
    }
    switch (status) {
      case 'ACCEPT':
        if (friendship.user_id == user.id)
          return { message: "You can't accept your own request" };
        else {
          updateData.status = 'FRIENDS';
					this.notificationService.setNotification(NotificationType.ACCEPTED_REQUEST, user.id, friendProfile.user_id);
				}
        break;
      case 'REJECT':
        if (friendship.user_id == user.id)
          return { message: "You can't reject your own request" };
        else
          updateData.status = 'NOTFRIENDS';
        break;
      case 'BLOCK':
        updateData.status = 'BLOCKED';
        break;
      case 'REMOVE':
        if (friendship.friend_id == user.id)
          return { message: "You can't remove your own request" };
        else
          updateData.status = 'NOTFRIENDS';
        break;
      default:
        return { message: "You can't do this action" };
    }
    return await this.prisma.friendship.update({
      where: { id: friendship.id },
      data: updateData,
    });

  }

  async updateStatusFromFriends(req: Request, status: Status, user: User, friendProfile: UserProfile, friendship: Friendship): Promise<FriendshipUpdateData | { message: string }> {
    let updateData: FriendshipUpdateData = {};
    if (friendship.user_id !== user.id) {
      updateData.user_id = user.id;
      updateData.friend_id = friendProfile.user_id;
    }
    switch (status) {
      case 'UNFRIEND':
        updateData.status = 'NOTFRIENDS';
        break;
      case 'BLOCK':
        updateData.status = 'BLOCKED';
        break;
      default:
        return { message: "You can't do this action" };
    }
    return await this.prisma.friendship.update({
      where: { id: friendship.id },
      data: updateData,
    });
  }

  async updateStatusFromBlocked(req: Request, status: Status, user: User, friendProfile: UserProfile, friendship: Friendship): Promise<FriendshipUpdateData | { message: string }> {
    let updateData: FriendshipUpdateData = {};
    if (friendship.user_id !== user.id) {
      updateData.user_id = user.id;
      updateData.friend_id = friendProfile.user_id;
    }
    switch (status) {
      case 'UNBLOCK':
        if (friendship.user_id !== user.id)
          return { message: "You can't unblock yourself" };
        updateData.status = 'NOTFRIENDS';
        break;
      default:
        return { message: "You can't do this action" };
    }
    return await this.prisma.friendship.update({
      where: { id: friendship.id },
      data: updateData,
    });
  }


  async updateStatusFromNotFriends(req: Request, status: Status, user: User, friendProfile: UserProfile, friendship: Friendship): Promise<FriendshipUpdateData | { message: string }> {
    let updateData: FriendshipUpdateData = {};
    if (friendship.user_id !== user.id) {
      updateData.user_id = user.id;
      updateData.friend_id = friendProfile.user_id;
    }
    switch (status) {
      case 'REQUEST':
        updateData.status = 'REQUESTED';
        break;
      case 'BLOCK':
        updateData.status = 'BLOCKED';
        break;
      default:
        return { message: "You can't do this action" };
    }
    return await this.prisma.friendship.update({
      where: { id: friendship.id },
      data: updateData,
    });
  }


  async createFriendship(req: Request, status: FriendshipStatus, user: User, friendProfile: UserProfile): Promise<Friendship> {
    const friendship =  await this.prisma.friendship.create({
      data: {
        user_id: user.id,
        friend_id: friendProfile.user_id,
        status: status,
      },
    });
		this.notificationService.setNotification(NotificationType.FRIEND_REQUEST, user.id, friendProfile.user_id);
		return friendship;
  }

  async updateFriendStatus(req: Request, status: Status, username: string): Promise<FriendshipUpdateData | { message: string }> {
    const user: User = await this.prisma.user.findUnique({
      where: { email: req.user["email"] },
    });
    const friendProfile: UserProfile = await this.prisma.userProfile.findUnique({
      where: { username: username },
    });
    if (!friendProfile) {
      return { message: "User Not Found" };
    }
    const friendship: Friendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { user_id: user.id, friend_id: friendProfile.user_id },
          { user_id: friendProfile.user_id, friend_id: user.id },
        ],
      },
    });
    if (friendship)
      switch (friendship.status) {
        case 'FRIENDS':
          return await this.updateStatusFromFriends(req, status, user, friendProfile, friendship);
        case 'REQUESTED':
          return await this.UpdateStatusFromRequest(req, status, user, friendProfile, friendship);
        case 'BLOCKED':
          return await this.updateStatusFromBlocked(req, status, user, friendProfile, friendship);
        case 'NOTFRIENDS':
          return await this.updateStatusFromNotFriends(req, status, user, friendProfile, friendship);
      }
    else if (!friendship && (status == 'ACCEPT' || status == 'REJECT' || status == 'REMOVE' || status == 'UNFRIEND' || status == 'UNBLOCK')) {
      return { message: "You can't do this action" };
    }
    else {
      switch (status) {
        case 'REQUEST':
          return await this.createFriendship(req, 'REQUESTED', user, friendProfile);
        case 'BLOCK':
          return await this.createFriendship(req, 'BLOCKED', user, friendProfile);
        default:
          return { message: "You can't do this action" };
      }
    }
  }
}
