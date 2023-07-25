import { Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import { PrismaClient } from '@prisma/client';
import { ChannelDTO } from './channel.dto';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
@Injectable()
export class ChannelService {

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
        return myChannels
				.filter((channel) => ['OWNER', 'ADMIN', 'MEMBER'].includes(channel.MemberType) && channel.Channel.type !== 'NOTACTIVE')
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
        const channel = await prisma.channel.findUnique({
            where: {
                name: name
            },
            include: {
                ChannelMembers: true,
            },
        });
        if (!channel || channel.type === 'NOTACTIVE') {
            return 'Channel not found';
        }
        if (channel.type === 'PUBLIC') {
            return {
                name: channel.name,
                type: channel.type,
								descrption: channel.description,
								avatar: channel.avatar,
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
                    user_id: user.id,
										Channel: {
											name: name
										}
                },
            });
            if (!channelMember || !['OWNER', 'ADMIN', 'MEMBER'].includes(channelMember.MemberType)) {
                return 'User is not a member of the channel';
            }
            return {
                name: channel.name,
                type: channel.type,
								descrption: channel.description,
								avatar: channel.avatar,
                createdAt: channel.createdAt,
                updatedAt: channel.updatedAt,
            };
        }
    }


    async getChannelMembers(@Req() req: Request, name: string) {
        const channel = await prisma.channel.findUnique({
            where: {
                name: name
            },
            include: {
                ChannelMembers: true,
            },
        });
        if (!channel || channel.type === 'NOTACTIVE') {
            return 'Channel not found';
        }
        const user = await this.searchUserById(req.user['id']);
        if (!user) {
            return 'User not found';
        }
        const channelMember = await prisma.channelMembers.findFirst({
            where: {
                user_id: user.id,
								Channel:{
									name: name
								}
            },
        });
        if (!channelMember || !['OWNER', 'ADMIN', 'MEMBER'].includes(channelMember.MemberType)) {
            return 'User is not a member of the channel';
        }
        const channelMembers = await prisma.channelMembers.findMany({
            where: {
                Channel: {
									name: name
								}
            },
            include: {
                User: {
									select: {
										userProfile: {
											select: {
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
				const hashedPassword = await bcrypt.hash(data.password, 10);
        const newChannel = await prisma.channel.create({
            data: {
                name: data.name,
                type: data.type,
								avatar: data.avatar,
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
        if (channelex && name !== data.name) {
            return 'Channel name already exists';
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
            return 'Only the owner can modify the channel';
        }
				const hashedPassword = await bcrypt.hash(data.password, 10);
        const updatedChannel = await prisma.channel.update({
            where: {
                name: name
            },
            data: {
                name: data.name,
                type: data.type,
                password: hashedPassword,
                description: data.description,
								avatar: data.avatar
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

    async deleteChannel(@Req() req: Request, name: string) {
        const channel = await prisma.channel.findUnique({
            where: {
                name: name
            },
            include: {
                ChannelMembers: true,
            },
        });
        if (!channel || channel.type === 'NOTACTIVE') {
            return 'Channel not found';
        }
        const user = await this.searchUserById(req.user['id']);
        if (!user) {
            return 'User not found';
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
            return 'User is not a member of the channel';
        }
        if (channelMember.MemberType !== 'OWNER') {
            return 'User is not the owner of the channel';
        }
        await prisma.channel.update({
            where: {
                name: name
            },
						data: {
							type: 'NOTACTIVE'
						}
        });
        return 'Channel deleted';
    }

    async createChannelMember(username: string, channel_name: string, memberType: 'MEMBER' | 'REQUESTED' | 'INVITED') {
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

    async updateChannelMember(memberId: number, memberType: 'MEMBER' | 'NOTMEMBER'| 'REQUESTED' |'INVITED' | 'BANNED' | 'MUTED' | 'ADMIN') {
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
        const channel = await prisma.channel.findUnique({
            where: {
                name: channel_name
            },
            include: {
                ChannelMembers: true,
            },
        });
        if (!channel || channel.type === 'NOTACTIVE') {
            return 'Channel not found';
        }
        const user = await this.searchUserById(req.user['id']);
        if (!user) {
            return 'User not found';
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
            return 'You do not have admin access to this channel';
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
            return 'User invited';
        }
				else if (channelMember2 && channelMember2.MemberType === 'NOTMEMBER' && action === 'invite') {
					await this.updateChannelMember(channelMember2.id, 'INVITED');
					return 'User invited';
				}
        else if (channelMember2) {
						if (channelMember2.MemberType === 'OWNER' && ['kick', 'ban', 'mute'].includes(action))
							return 'You cannot kick, ban or mute an owner'
            switch (action) {
                case 'ban':
                    if (channelMember2.MemberType === 'BANNED') {
                        return 'User is already banned';
                    }
										else if (!['OWNER', 'ADMIN', 'MEMBER'].includes(channelMember2.MemberType))
											return 'The user has to be a member to be banned'
                    await this.updateChannelMember(channelMember2.id, 'BANNED');
                    return 'User banned';
                case 'mute':
                    if (channelMember2.MemberType === 'MUTED') {
                        return 'User is already muted';
                    }
										else if (!['OWNER', 'ADMIN', 'MEMBER'].includes(channelMember2.MemberType))
											return 'The user has to be a member to be muted'
                    await this.updateChannelMember(channelMember2.id, 'MUTED');
                    return 'User muted';
                case 'kick':
										if (!['OWNER', 'ADMIN', 'MEMBER'].includes(channelMember2.MemberType))
											return 'The user has to be a member to be kicked out'
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
                        return 'User is not requesting to join'
                    }
                    await this.updateChannelMember(channelMember2.id, 'MEMBER');
                    return 'User accepted';
                case 'reject':
                    if (channelMember2.MemberType !== 'REQUESTED') {
                        return 'User is not requesting to join'
                    }
                    await this.updateChannelMember(channelMember2.id, 'NOTMEMBER');
                    return 'User rejected';
                case 'uninvite':
										if (channelMember2.MemberType !== 'INVITED')
											return 'User is not invited'
                    await this.updateChannelMember(channelMember2.id, 'NOTMEMBER');
                    return 'User uninvited';
                case 'makeAdmin':
                    if (channelMember2.MemberType === 'OWNER' || channelMember2.MemberType === 'ADMIN') {
                        return 'The user is already an admin';
                    }
										else if (channelMember2.MemberType !== 'MEMBER')
											return 'The user is not a member in the channel'
                    await this.updateChannelMember(channelMember2.id, 'ADMIN');
                    return 'The user is now an admin';
                case 'makeUser':
										if (!['OWNER', 'ADMIN', 'MEMBER'].includes(channelMember2.MemberType))
												return 'The user is not a member in the channel'
                    await this.updateChannelMember(channelMember2.id, 'MEMBER');
                    return "The user's admin rights have been revoked";
                default:
                    return 'Invalid action';
            }
        }
        else {
            return 'Invalid action';
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
            return 'Channel not found';
        }
        const user = await this.searchUserById(req.user['id']);
        if (!user) {
            return 'User not found';
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
						return 'The user cannot join this channel'
					return 'A request to join the channel has been sent'
				}
        if ((!channelMember || channelMember.MemberType === 'NOTMEMBER') && action === 'leave') {
            return 'You are not a member of the channel';
        }
				if ((!channelMember || channelMember.MemberType === 'NOTMEMBER') && action === 'cancel') {
					return 'You did not request to join the channel';
				}
				else if (channelMember.MemberType === 'MEMBER' && action === 'join') {
					return 'You are already a member in the channel';
				}
        else if (channelMember.MemberType === 'BANNED') {
					return 'You are banned from the channel';
        }
        else if (channelMember.MemberType === 'MUTED') {
					return 'You are muted in the channel';
        }
        else if (channelMember.MemberType === 'REQUESTED' && !['join', 'cancel'].includes(action)) {
					return 'You have a pending request to join the channel'
        }
				else if (channelMember.MemberType !== 'REQUESTED' && action === 'cancel') {
					return 'You did not request to join the channel'
        }
        else if (channelMember.MemberType === 'INVITED' && !['accept', 'reject'].includes(action)) {
					return 'You are invited to the channel';
        }
				else if (channelMember.MemberType !== 'INVITED' && ['accept', 'reject'].includes(action)) {
					return 'You are not invited to the channel';
				}
        switch (action) {
            case 'join':
							if (channel.type === 'PROTECTED'){
								if (! await bcrypt.compare(password, channel.password))
									return 'Wrong password'
							}
							if (channelMember.MemberType === 'NOTMEMBER') {
								await this.updateChannelMember(channelMember.id, 'MEMBER');
								return 'Joined channel';								
							}
							await this.createChannelMember(user.userProfile[0].username, name, 'MEMBER');
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