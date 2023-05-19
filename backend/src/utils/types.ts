import { User } from '@prisma/client';

export type UserDetails = {
    email:      string;
    username:   string;
    avatar:     string;
};

export type Tokens = {
    access_token:   string;
    refresh_token:  string;
};

export type Done = (err: Error, user: User) => void;