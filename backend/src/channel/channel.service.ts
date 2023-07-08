import { Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import { PrismaClient } from '.prisma/client';
import { User } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class ChannelService {

    async searchUserById(id: number) {
        return await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
    }


    async getMyChannels(@Req() req: Request) {
        const user = await this.searchUserById(req.user['id']);
        if (!user) {
            return 'User not found';
        }
        const myChannels = await prisma.channelMembers.findMany({
            where: {
                user_id: user.id,
            },
            include: {
                Channel: true,
            },
        });
        return myChannels.map((channel) => {
            return {
                id: channel.Channel.id,
                name: channel.Channel.name,
                Type: channel.Channel.type,
                createdAt: channel.Channel.createdAt,
                updatedAt: channel.Channel.updatedAt,
            };
        }
        );
    }

    async getPublicChannels(@Req() req: Request) {

        const publicChannels = await prisma.channel.findMany({
            where: {
                type: 'PUBLIC',
                NOT: {
                    ChannelMembers: {
                        some: {
                            user_id: req.user['id'],
                        },
                    },
                },
            },
        });

        return publicChannels.map((channel) => {
            return {
                id: channel.id,
                name: channel.name,
                Type: channel.type,
                createdAt: channel.createdAt,
                updatedAt: channel.updatedAt,
            };
        }
        );
    }

    async getChannel(@Req() req: Request, channel_id: number) {
        channel_id = Number(channel_id);
        const channel = await prisma.channel.findUnique({
            where: {
                id: channel_id,
            },
            include: {
                ChannelMembers: true,
            },
        });
        if (!channel) {
            return 'Channel not found';
        }
        if (channel.type === 'PUBLIC') {
            return {
                id: channel.id,
                name: channel.name,
                Type: channel.type,
                createdAt: channel.createdAt,
                updatedAt: channel.updatedAt,
            };
        }
        else {
            const user = await this.searchUserById(req.user['id']);
            if (!user) {
                return 'User not found';
            }
            const channelMember = await prisma.channelMembers.findFirst({
                where: {
                    channel_id: channel_id,
                    user_id: user.id,
                },
            });
            if (!channelMember) {
                return 'User is not a member of the channel';
            }
            return {
                id: channel.id,
                name: channel.name,
                Type: channel.type,
                createdAt: channel.createdAt,
                updatedAt: channel.updatedAt,
            };
        }
    }


    async getChannelMembers(@Req() req: Request, channel_id: number) {
        channel_id = Number(channel_id);
        const channel = await prisma.channel.findUnique({
            where: {
                id: channel_id,
            },
            include: {
                ChannelMembers: true,
            },
        });
        if (!channel) {
            return 'Channel not found';
        }
        const user = await this.searchUserById(req.user['id']);
        if (!user) {
            return 'User not found';
        }
        const channelMember = await prisma.channelMembers.findFirst({
            where: {
                channel_id: channel_id,
                user_id: user.id,
            },
        });
        if (!channelMember) {
            return 'User is not a member of the channel';
        }
        const channelMembers = await prisma.channelMembers.findMany({
            where: {
                channel_id: channel_id,
            },
            include: {
                User: true,
            },
        });

        return channelMembers.map((channelMember) => {
            return {
                id: channelMember.User.id,
                email: channelMember.User.email,
                type: channelMember.MemberType
            };
        }
        );
    }

    async getInvitations(@Req() req: Request) {
        const user = await this.searchUserById(req.user['id']);
        if (!user) {
            return 'User not found';
        }
        const invitations = await prisma.channelMembers.findMany({
            where: {
                user_id: user.id,
                MemberType: 'INVITED',
            },
            include: {
                Channel: true,
            },
        });
        return invitations.map((invitation) => {
            return {
                id: invitation.Channel.id,
                name: invitation.Channel.name,
                Type: invitation.Channel.type,
                createdAt: invitation.Channel.createdAt,
                updatedAt: invitation.Channel.updatedAt,
            };
        }
        );
    }

}
