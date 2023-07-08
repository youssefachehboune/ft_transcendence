import { Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import { PrismaClient } from '.prisma/client';
import { User } from '@prisma/client';
import { ChannelDTO } from './channel.dto';

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

    async createChannel(@Req() req: Request, data: ChannelDTO) {
        const user = await this.searchUserById(req.user['id']);
        if (!user) {
            return 'User not found';
        }
        const channel = await prisma.channel.findUnique({
            where: {
                name: data.name,
            },
        });
        if (channel) {
            return 'Channel already exists';
        }
        const newChannel = await prisma.channel.create({
            data: {
                name: data.name,
                type: data.type,
                password: data.password,
                description: data.description,
                ChannelMembers: {
                    create: {
                        user_id: user.id,
                        MemberType: 'OWNER',
                    },
                },
            },
        });
        return {
            id: newChannel.id,
            name: newChannel.name,
            Type: newChannel.type,
            createdAt: newChannel.createdAt,
            updatedAt: newChannel.updatedAt,
        };
    }

    async updateChannel(@Req() req: Request, channel_id: number, data: ChannelDTO) {
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
        const channelex = await prisma.channel.findUnique({
            where: {
                name: data.name,
            },
        });
        if (channelex) {
            return 'Channel name already exists';
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
        if (channelMember.MemberType !== 'OWNER' && channelMember.MemberType !== 'ADMIN') {
            return 'User is not the owner of the channel';
        }
        const updatedChannel = await prisma.channel.update({
            where: {
                id: channel_id,
            },
            data: {
                name: data.name,
                type: data.type,
                password: data.password,
                description: data.description,
            },
        });
        return {
            id: updatedChannel.id,
            name: updatedChannel.name,
            Type: updatedChannel.type,
            createdAt: updatedChannel.createdAt,
            updatedAt: updatedChannel.updatedAt,
        };
    }

    async deleteChannel(@Req() req: Request, channel_id: number) {
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
        if (channelMember.MemberType !== 'OWNER') {
            return 'User is not the owner of the channel';
        }
        await prisma.channel.delete({
            where: {
                id: channel_id,
            },
        });
        return 'Channel deleted';
    }

    async createChannelMember(userId: number, channelId: number, memberType: 'MEMBER' | 'REQUESTED' | 'INVITED') {
        return await prisma.channelMembers.create({
            data: {
                user_id: userId,
                channel_id: channelId,
                MemberType: memberType
            }
        });
    }

    async updateChannelMember(memberId: number, memberType: 'MEMBER' | 'NOTMEMBER' | 'BANNED' | 'MUTED' | 'ADMIN') {
        return await prisma.channelMembers.update({
            where: {
                id: memberId
            },
            data: {
                MemberType: memberType
            }
        });
    }


    async AdminActions(@Req() req: Request, channel_id: number, user_id: number, action: 'ban' | 'mute' | 'kick' | 'unban' | 'unmute' | 'accept' | 'reject' | 'invite' | 'remove' | 'makeAdmin' | 'makeUser') {
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
            return 'You are not a member of the channel';
        }
        if (channelMember.MemberType !== 'OWNER' && channelMember.MemberType !== 'ADMIN') {
            return 'You are not the owner of the channel';
        }
        const channelMember2 = await prisma.channelMembers.findFirst({
            where: {
                channel_id: channel_id,
                user_id: user_id,
            },
        });
        if (!channelMember2 && action === 'invite') {
            await this.createChannelMember(user_id, channel_id, 'INVITED');
            return 'User invited';
        }

        else if (channelMember2) {
            switch (action) {
                case 'ban':
                    if (channelMember2.MemberType === 'BANNED') {
                        return 'User is already banned';
                    }
                    await this.updateChannelMember(channelMember2.id, 'BANNED');
                    return 'User banned';
                case 'mute':
                    if (channelMember2.MemberType === 'MUTED') {
                        return 'User is already muted';
                    }
                    await this.updateChannelMember(channelMember2.id, 'MUTED');
                    return 'User muted';
                case 'kick':
                    if (channelMember2.MemberType === 'NOTMEMBER') {
                        return 'User is not a member of the channel';
                    }
                    await this.updateChannelMember(channelMember2.id, 'NOTMEMBER');
                    return 'User kicked';
                case 'unban':
                    if (channelMember2.MemberType !== 'BANNED') {
                        return 'User is not banned';
                    }
                    await this.updateChannelMember(channelMember2.id, 'MEMBER');
                    return 'User unbanned';
                case 'unmute':
                    if (channelMember2.MemberType !== 'MUTED') {
                        return 'User is not muted';
                    }
                    await this.updateChannelMember(channelMember2.id, 'MEMBER');
                    return 'User unmuted';
                case 'accept':
                    if (channelMember2.MemberType !== 'REQUESTED') {
                        return 'User is not requested';
                    }
                    await this.updateChannelMember(channelMember2.id, 'MEMBER');
                    return 'User accepted';
                case 'reject':
                    if (channelMember2.MemberType !== 'REQUESTED') {
                        return 'User is not requested';
                    }
                    await this.updateChannelMember(channelMember2.id, 'NOTMEMBER');
                    return 'User rejected';
                case 'remove':
                    if (channelMember2.MemberType === 'NOTMEMBER') {
                        return 'User is not a member of the channel';
                    }
                    await this.updateChannelMember(channelMember2.id, 'NOTMEMBER');
                    return 'User removed';
                case 'makeAdmin':
                    if (channelMember.MemberType !== 'OWNER' || channelMember2.MemberType === 'ADMIN') {
                        return 'Invalid action';
                    }
                    await this.updateChannelMember(channelMember2.id, 'ADMIN');
                    return 'User made admin';
                case 'makeUser':
                    if (channelMember.MemberType !== 'OWNER' || channelMember2.MemberType !== 'ADMIN') {
                        return 'Invalid action';
                    }
                    await this.updateChannelMember(channelMember2.id, 'MEMBER');
                    return 'User made user';
                default:
                    return 'Invalid action';
            }
        }
        else {
            return 'Invalid action';
        }
    }

    async UserActions(@Req() req: Request, channel_id: number, action: 'join' | 'leave' | 'cancel' | 'accept' | 'reject') {
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
            return 'You are not a member of the channel';
        }
        if (channelMember.MemberType === 'BANNED') {
            return 'You are banned from the channel';
        }
        if (channelMember.MemberType === 'MUTED') {
            return 'You are muted in the channel';
        }
        if (channelMember.MemberType === 'NOTMEMBER') {
            return 'You are not a member of the channel';
        }
        if (channelMember.MemberType === 'REQUESTED') {
            return 'You are already requested';
        }
        if (channelMember.MemberType === 'INVITED') {
            return 'You are already invited';
        }
        switch (action) {
            case 'join':
                await this.createChannelMember(user.id, channel_id, 'MEMBER');
                return 'Joined channel';
            case 'leave':
                await this.updateChannelMember(channelMember.id, 'NOTMEMBER');
                return 'Left channel';
            case 'cancel':
                await this.updateChannelMember(channelMember.id, 'NOTMEMBER');
                return 'Cancelled request';
            case 'accept':
                await this.updateChannelMember(channelMember.id, 'MEMBER');
                return 'Accepted invite';
            case 'reject':
                await this.updateChannelMember(channelMember.id, 'NOTMEMBER');
                return 'Rejected invite';
            default:
                return 'Invalid action';
        }
    }
}
