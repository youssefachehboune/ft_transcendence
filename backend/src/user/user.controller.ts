import {
    Controller,
    Post,
    Body,
    Get
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { Role, User as UserModel} from '@prisma/client';
  
  @Controller('user')
  export class UserController {
    constructor(
      private readonly userService: UserService,
    ) {}
    @Get()
    get() : string {
        return 'Hello from user!';
    }
    @Post()
    async signupUser(
      @Body() userData: { email: string, twoFactorEnabled: boolean, role: Role},
    ): Promise<UserModel> {
      return this.userService.createUser(userData);
    }
}