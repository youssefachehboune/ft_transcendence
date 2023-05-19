import { User } from "@prisma/client";
import { UserDetails } from "../../../utils/types";
import { Response } from "express";
import { Res } from "@nestjs/common";

export interface AuthenticationProvider {
    validateUser(details: UserDetails);
    createUser(details: UserDetails);
    findUser(email: string): Promise<User | undefined>;
}