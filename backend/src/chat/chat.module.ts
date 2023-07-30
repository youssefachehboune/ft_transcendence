import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { ChatController } from './chat.controller';

@Module({
	imports: [ AuthModule ],
  providers: [ ChatGateway, ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
