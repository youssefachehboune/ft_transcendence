import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        ProfileController,],
    providers: [
        ProfileService,],
})
export class ProfileModule { }
