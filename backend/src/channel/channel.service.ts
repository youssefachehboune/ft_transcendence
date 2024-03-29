import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import { PrismaClient } from '@prisma/client';
import { ChannelDTO } from './channel.dto';
import * as bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';

config();

cloudinary.config({
    cloud_name: 'dlubm2sog',
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const prisma = new PrismaClient();
@Injectable()
export class ChannelService {
    async getMemberType(channel_name: string, username: string) {
        try {
            const profile = await prisma.userProfile.findUnique({
                where: { username }
            });
            const channel = await prisma.channel.findUnique({
                where: { name: channel_name }
            });
            const member = await prisma.channelMembers.findFirst({
                where: {
                    channel_id: channel.id,
                    user_id: profile.user_id
                }
            });
            return member.MemberType;
        } catch (err) {
            return null;
        }
    }

    async getSpecificUsers(@Req() req: Request, name: string, type: 'INVITED' | 'BANNED' | 'MUTED' | 'REQUESTED') {
        const channel = await prisma.channel.findUnique({
            where: {
                name: name
            }
        });
				if(!channel)
					throw new BadRequestException("channel not found");
        const channelMembers = await prisma.channelMembers.findMany({
            where: {
                channel_id: channel.id,
                MemberType: type
            }
        });
        return await Promise.all(channelMembers.map(async (member) => {
            const profile = await prisma.userProfile.findFirst({
                where: {
                    user_id: member.user_id
                }
            });
            return {
                username: profile.username,
                firstName: profile.firstName,
                lastName: profile.lastName,
                avatar: profile.avatar
            }
        }))
    }

    async searchUserById(id: number) {
        return await prisma.user.findUnique({
            where: {
                id: id,
            },
            include: {
                userProfile: {
                    select: {
                        username: true
                    }
                }
            }
        });
    }


    async getMyChannels(@Req() req: Request) {
        const user = await this.searchUserById(req.user['id']);
        if (!user) {
            return { error: 'User not found' }
        }
        const myChannels = await prisma.channelMembers.findMany({
            where: {
                user_id: user.id,
            },
            include: {
                Channel: true,
            },
        });
        return myChannels
            .filter((channel) => ['OWNER', 'ADMIN', 'MEMBER', 'MUTED'].includes(channel.MemberType) && channel.Channel.type !== 'NOTACTIVE')
            .map((channel) => {
                return {
                    name: channel.Channel.name,
                    type: channel.Channel.type,
                    description: channel.Channel.description,
                    avatar: channel.Channel.avatar,
                    createdAt: channel.Channel.createdAt,
                    updatedAt: channel.Channel.updatedAt,
                };
            }
            );
    }

    async getChannels(@Req() req: Request) {

        const publicChannels = await prisma.channel.findMany({
            where: {
                NOT: {
                    OR: [
                        {ChannelMembers: {
                            some: {
                                user_id: req.user['id'],
                                OR: [
                                    { MemberType: 'MEMBER' },
                                    { MemberType: 'ADMIN' },
                                    { MemberType: 'OWNER' },
                                    { MemberType: 'REQUESTED' },
                                ]
                            },
                        }},
                        {type: 'NOTACTIVE'}
                    ]
                },
            },
        });

        return publicChannels.map((channel) => {
            return {
                name: channel.name,
                description: channel.description,
                avatar: channel.avatar,
                type: channel.type,
                createdAt: channel.createdAt,
                updatedAt: channel.updatedAt,
            };
        }
        );
    }

    async getChannel(@Req() req: Request, name: string) {
        if(!name) { return { error: 'Channel name is required' } }
        const channel = await prisma.channel.findUnique({
            where: {
                name: name
            },
        });
        if (!channel || channel.type === 'NOTACTIVE') {
            return { error: 'Channel not found' }
        }
        return {
            name: channel.name,
            type: channel.type,
            description: channel.description,
            avatar: channel.avatar,
        };
    }


    async getChannelMembers(@Req() req: Request, name: string) {
        if(!name) { return { error: 'Channel name is required' } }
        const channel = await prisma.channel.findUnique({
            where: {
                name: name
            },
            include: {
                ChannelMembers: true,
            },
        });
        if (!channel || channel.type === 'NOTACTIVE') {
            return { error: 'Channel not found' }
        }
        const user = await this.searchUserById(req.user['id']);
        if (!user) {
            return { error: 'User not found' }
        }
        const channelMember = await prisma.channelMembers.findFirst({
            where: {
                user_id: user.id,
                Channel: {
                    name: name
                }
            },
        });
        if (!channelMember || !['OWNER', 'ADMIN', 'MEMBER', 'MUTED'].includes(channelMember.MemberType)) {
            return { error: 'User is not a member of the channel' }
        }
        const channelMembers = await prisma.channelMembers.findMany({
            where: {
                Channel: {
                    name: name
                },
                OR: [
                    { MemberType: 'ADMIN' },
                    { MemberType: 'OWNER' },
                    { MemberType: 'MEMBER' },
                ]
            },
            include: {
                User: {
                    select: {
                        userProfile: {
                            select: {
                                user_id: true,
                                username: true,
                                firstName: true,
                                lastName: true,
                                avatar: true
                            }
                        }
                    }
                },
            },
        });

        return channelMembers.map((channelMember) => {
            return {
                user_id: channelMember.User.userProfile[0].user_id,
                username: channelMember.User.userProfile[0].username,
                firstName: channelMember.User.userProfile[0].firstName,
                lastName: channelMember.User.userProfile[0].lastName,
                avatar: channelMember.User.userProfile[0].avatar,
                type: channelMember.MemberType
            };
        }
        );
    }

    async getInvitations(@Req() req: Request) {
        const user = await this.searchUserById(req.user['id']);
        if (!user) {
            return { error: 'User not found' }
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
                name: invitation.Channel.name,
                type: invitation.Channel.type,
                description: invitation.Channel.description,
                avatar: invitation.Channel.avatar,
                createdAt: invitation.Channel.createdAt,
                updatedAt: invitation.Channel.updatedAt,
            };
        }
        ).filter(invitation => invitation.type !== 'NOTACTIVE');
    }

    async createChannel(@Req() req: Request, data: ChannelDTO) {
        const user = await this.searchUserById(req.user['id']);
        if (!user) {
            return { error: 'User not found' }
        }
        const channel = await prisma.channel.findUnique({
            where: {
                name: data.name,
            },
        });
        if (channel) {
            return { error: 'Channel already exists' }
        }
        let avatar = data.avatar;
        if (data.avatar.length > 500)
            avatar = (await cloudinary.uploader.upload( data.avatar, { public_id: data.name } )).url;
        let hashedPassword = '';
        if (data.password)
            hashedPassword = await bcrypt.hash(data.password, 10);
        const newChannel = await prisma.channel.create({
            data: {
                name: data.name,
                type: data.type,
                avatar: avatar,
                password: hashedPassword,
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
            name: newChannel.name,
            type: newChannel.type,
            description: newChannel.description,
            avatar: newChannel.avatar,
            createdAt: newChannel.createdAt,
            updatedAt: newChannel.updatedAt,
        };
    }

    async updateChannel(@Req() req: Request, name: string, data: ChannelDTO) {
        const channel = await prisma.channel.findUnique({
            where: {
                name: name
            },
            include: {
                ChannelMembers: true,
            },
        });
        if (!channel || channel.type === 'NOTACTIVE') {
            return { error: 'Channel not found' }
        }
        const user = await this.searchUserById(req.user['id']);
        if (!user) {
            return { error: 'User not found' }
        }
        const channelex = await prisma.channel.findUnique({
            where: {
                name: data.name,
            },
        });
        if (channelex && name !== data.name) {
            return { error: 'Channel name already exists' }
        }
        const channelMember = await prisma.channelMembers.findFirst({
            where: {
                user_id: user.id,
                Channel: {
                    name: name
                }
            },
        });
        if (!channelMember || channelMember.MemberType !== 'OWNER') {
            return { error: 'Only the owner can modify the channel' }
        }
        let avatar = data.avatar;
        if (data.avatar.length > 500)
            avatar = (await cloudinary.uploader.upload( data.avatar, { public_id: data.name } )).url;
        let hashedPassword = '';
        if (data.password)
            hashedPassword = await bcrypt.hash(data.password, 10);
        const updatedChannel = await prisma.channel.update({
            where: {
                name: name
            },
            data: {
                name: data.name,
                type: data.type,
                password: hashedPassword,
                description: data.description,
                avatar: avatar
            },
        });
        return {
            name: updatedChannel.name,
            type: updatedChannel.type,
            description: updatedChannel.description,
            avatar: updatedChannel.avatar,
            createdAt: updatedChannel.createdAt,
            updatedAt: new Date(),
        };
    }

    async getChannelname(name: string): Promise<string> {
        const channel = await prisma.channel.findUnique({
            where: { name }
        })
        if (channel) {
            name += Math.floor(Math.random() * 9);
            return this.getChannelname(name);
        }
        return name;
    }

    async deleteChannel(@Req() req: Request, name: string) {
        if(!name) { return { error: 'Channel name is required' } }
        const channel = await prisma.channel.findUnique({
            where: {
                name: name
            },
            include: {
                ChannelMembers: true,
            },
        });
        if (!channel || channel.type === 'NOTACTIVE') {
            return { error: 'Channel not found' }
        }
        const user = await this.searchUserById(req.user['id']);
        if (!user) {
            return { error: 'User not found' }
        }
        const channelMember = await prisma.channelMembers.findFirst({
            where: {
                user_id: user.id,
                Channel: {
                    name: name
                }
            },
        });
        if (!channelMember || !['OWNER', 'ADMIN', 'MEMBER'].includes(channelMember.MemberType)) {
            return { error: 'User is not a member of the channel' }
        }
        if (channelMember.MemberType !== 'OWNER') {
            return { error: 'User is not the owner of the channel' }
        }
        const channelname = await this.getChannelname('deleted_channel');
        await prisma.channel.update({
            where: {
                name: name
            },
            data: {
                type: 'NOTACTIVE',
                name: channelname
            }
        });
        return { success: 'Channel deleted' }
    }

    async createChannelMember(username: string, channel_name: string, memberType: 'MEMBER' | 'REQUESTED' | 'INVITED') {
        if(!username || !channel_name) { return { error: 'Username and channel name are required' } };
        const channel = await prisma.channel.findUnique({
            where: {
                name: channel_name
            }
        });
        const profile = await prisma.userProfile.findUnique({
            where: {
                username: username
            },
            include: {
                User: true
            }
        })
        return await prisma.channelMembers.create({
            data: {
                user_id: profile.User.id,
                channel_id: channel.id,
                MemberType: memberType
            }
        });
    }

    async updateChannelMember(memberId: number, memberType: 'MEMBER' | 'NOTMEMBER' | 'REQUESTED' | 'INVITED' | 'BANNED' | 'MUTED' | 'ADMIN') {
        return await prisma.channelMembers.update({
            where: {
                id: memberId
            },
            data: {
                MemberType: memberType
            }
        });
    }


    async AdminActions(@Req() req: Request, channel_name: string, username: string, action: 'ban' | 'mute' | 'kick' | 'unban' | 'unmute' | 'accept' | 'reject' | 'invite' | 'uninvite' | 'makeAdmin' | 'makeUser') {
        if(!channel_name || !username || !action) { return { error: 'Channel name, username and action are required' } };
        const channel = await prisma.channel.findUnique({
            where: {
                name: channel_name
            },
            include: {
                ChannelMembers: true,
            },
        });
        if (!channel || channel.type === 'NOTACTIVE') {
            return { error: 'Channel not found' }
        }
        const user = await this.searchUserById(req.user['id']);
        if (!user) {
            return { error: 'User not found' }
        }
        const channelMember = await prisma.channelMembers.findFirst({
            where: {
                user_id: user.id,
                Channel: {
                    name: channel_name
                }
            },
        });
        if (!channelMember || !['OWNER', 'ADMIN'].includes(channelMember.MemberType)) {
            return { error: 'You do not have admin access to this channel' }
        }
        const profile = await prisma.userProfile.findFirst({
            where: {
                username: username
            },
            include: {
                User: true
            }
        })
        const channelMember2 = await prisma.channelMembers.findFirst({
            where: {
                user_id: profile.User.id,
                Channel: {
                    name: channel_name
                }
            },
        });
        if (!channelMember2 && action === 'invite') {
            await this.createChannelMember(username, channel_name, 'INVITED');
            return { error: 'User invited' }
        }
        else if (channelMember2 && channelMember2.MemberType === 'NOTMEMBER' && action === 'invite') {
            await this.updateChannelMember(channelMember2.id, 'INVITED');
            return { error: 'User invited' }
        }
        else if (channelMember2) {
            if (channelMember2.MemberType === 'OWNER' && ['kick', 'ban', 'mute'].includes(action))
                return { error: 'You cannot kick, ban or mute an owner' }
            switch (action) {
                case 'ban':
                    if (channelMember2.MemberType === 'BANNED') {
                        return { error: 'User is already banned' }
                    }
                    else if (!['OWNER', 'ADMIN', 'MEMBER'].includes(channelMember2.MemberType))
                        return { error: 'The user has to be a member to be banned' }
                    await this.updateChannelMember(channelMember2.id, 'BANNED');
                    return { error: 'User banned' }
                case 'mute':
                    if (channelMember2.MemberType === 'MUTED') {
                        return { error: 'User is already muted' }
                    }
                    else if (!['OWNER', 'ADMIN', 'MEMBER'].includes(channelMember2.MemberType))
                        return { error: 'The user has to be a member to be muted' }
                    await this.updateChannelMember(channelMember2.id, 'MUTED');
                    return { error: 'User muted' }
                case 'kick':
                    if (!['OWNER', 'ADMIN', 'MEMBER'].includes(channelMember2.MemberType))
                        return { error: 'The user has to be a member to be kicked out' }
                    await this.updateChannelMember(channelMember2.id, 'NOTMEMBER');
                    return { error: 'User kicked' }
                case 'unban':
                    if (channelMember2.MemberType !== 'BANNED') {
                        return { error: 'User is not banned' }
                    }
                    await this.updateChannelMember(channelMember2.id, 'NOTMEMBER');
                    return { error: 'User unbanned' }
                case 'unmute':
                    if (channelMember2.MemberType !== 'MUTED') {
                        return { error: 'User is not muted' }
                    }
                    await this.updateChannelMember(channelMember2.id, 'MEMBER');
                    return { error: 'User unmuted' }
                case 'accept':
                    if (channelMember2.MemberType !== 'REQUESTED') {
                        return { error: 'User is not requesting to join' }
                    }
                    await this.updateChannelMember(channelMember2.id, 'MEMBER');
                    return { error: 'User accepted' }
                case 'reject':
                    if (channelMember2.MemberType !== 'REQUESTED') {
                        return { error: 'User is not requesting to join' }
                    }
                    await this.updateChannelMember(channelMember2.id, 'NOTMEMBER');
                    return { error: 'User rejected' }
                case 'uninvite':
                    if (channelMember2.MemberType !== 'INVITED')
                        return { error: 'User is not invited' }
                    await this.updateChannelMember(channelMember2.id, 'NOTMEMBER');
                    return { error: 'User uninvited' }
                case 'makeAdmin':
                    if (channelMember2.MemberType === 'OWNER' || channelMember2.MemberType === 'ADMIN') {
                        return { error: 'The user is already an admin' }
                    }
                    else if (channelMember2.MemberType !== 'MEMBER')
                        return { error: 'The user is not a member in the channel' }
                    await this.updateChannelMember(channelMember2.id, 'ADMIN');
                    return { error: 'The user is now an admin' }
                case 'makeUser':
                    if (!['OWNER', 'ADMIN', 'MEMBER'].includes(channelMember2.MemberType))
                        return { error: 'The user is not a member in the channel' }
                    await this.updateChannelMember(channelMember2.id, 'MEMBER');
                    return "The user's admin rights have been revoked";
                default:
                    return { error: 'Invalid action' }
            }
        }
        else {
            return { error: 'Invalid action' }
        }
    }

    async UserActions(@Req() req: Request, password: string, name: string, action: 'join' | 'leave' | 'cancel' | 'accept' | 'reject') {
        const channel = await prisma.channel.findUnique({
            where: {
                name: name
            },
            include: {
                ChannelMembers: true,
            },
        });
        if (!channel || channel.type === 'NOTACTIVE') {
            return { error: 'Channel not found' }
        }
        const user = await this.searchUserById(req.user['id']);
        if (!user) {
            return { error: 'User not found' }
        }
        const channelMember = await prisma.channelMembers.findFirst({
            where: {
                user_id: user.id,
                Channel: {
                    name: name
                }
            },
        });
        if (channel.type === 'PRIVATE' && action === 'join') {
            if (!channelMember)
                this.createChannelMember(user.userProfile[0].username, name, 'REQUESTED')
            else if (channelMember.MemberType === 'NOTMEMBER')
                this.updateChannelMember(channelMember.id, 'REQUESTED')
            else
                return { error: 'The user cannot join this channel' }
            return { error: 'A request to join the channel has been sent' }
        }
        if ((!channelMember || channelMember.MemberType === 'NOTMEMBER') && action === 'leave') {
            return { error: 'You are not a member of the channel' }
        }
        else if ((!channelMember || channelMember.MemberType === 'NOTMEMBER') && action === 'cancel') {
            return { error: 'You did not request to join the channel' }
        }
        else if ((!channelMember || channelMember.MemberType === 'NOTMEMBER') && (action === 'accept' || action === 'reject')) {
            return { error: 'You are not invited to the channel' }
        }
        else if (channelMember && channelMember.MemberType === 'MEMBER' && action === 'join') {
            return { error: 'You are already a member in the channel' }
        }
        else if (channelMember && channelMember.MemberType === 'BANNED') {
            return { error: 'You are banned from the channel' }
        }
        else if (channelMember && channelMember.MemberType === 'MUTED') {
            return { error: 'You are muted in the channel' }
        }
        else if (channelMember && channelMember.MemberType === 'REQUESTED' && !['join', 'cancel'].includes(action)) {
            return { error: 'You have a pending request to join the channel' }
        }
        else if (channelMember && channelMember.MemberType !== 'REQUESTED' && action === 'cancel') {
            return { error: 'You did not request to join the channel' }
        }
        else if (channelMember && channelMember.MemberType === 'INVITED' && !['accept', 'reject'].includes(action)) {
            return { error: 'You are invited to the channel' }
        }
        else if (channelMember && channelMember.MemberType !== 'INVITED' && ['accept', 'reject'].includes(action)) {
            return { error: 'You are not invited to the channel' }
        }
        switch (action) {
            case 'join':
                if (channel.type === 'PROTECTED') {
                    if (! await bcrypt.compare(password, channel.password))
                        return { error: 'Wrong password' }
                }
                if (channelMember && channelMember.MemberType === 'NOTMEMBER') {
                    await this.updateChannelMember(channelMember.id, 'MEMBER');
                    return { success: 'Joined channel' }
                }
                await this.createChannelMember(user.userProfile[0].username, name, 'MEMBER');
                return { success: 'Joined channel' }
            case 'leave':
                await this.updateChannelMember(channelMember.id, 'NOTMEMBER');
                return { success: 'Left channel' }
            case 'cancel':
                await this.updateChannelMember(channelMember.id, 'NOTMEMBER');
                return { success: 'Cancelled request' }
            case 'accept':
                await this.updateChannelMember(channelMember.id, 'MEMBER');
                return { success: 'Accepted invite' }
            case 'reject':
                await this.updateChannelMember(channelMember.id, 'NOTMEMBER');
                return { success: 'Rejected invite' }
            default:
                return { error: 'Invalid action' }
        }
    }
}
