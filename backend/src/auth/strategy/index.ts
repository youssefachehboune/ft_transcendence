import { Profile, Strategy } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { AuthenticationProvider } from '../services/auth/auth';


@Injectable()
export class IntraStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthenticationProvider) {
        super({
            clientID: 'u-s4t2ud-3b9a2a9316b3e3d31a4fda165e0f776b4d43eef30849e11e33eef10a8f867eed',
            clientSecret: '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',
            callbackURL: 'http://localhost:3333/api/auth/redirect',
            scope: ['public'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        const userDetails = {email: profile._json.email, username: profile._json.login, avatar: profile._json.image.link};
        return this.authService.validateUser(userDetails);
    }
}

export * from './at.strategy';
export * from './rt.strategy';