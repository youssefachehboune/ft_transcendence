import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { TokenErrorFilter } from './auth/auth.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalFilters(new TokenErrorFilter());
	app.enableCors({
    origin: true,
    credentials: true,
  });
	app.useGlobalPipes(new ValidationPipe());
	const config = new DocumentBuilder()
		.setTitle('Transcendence API')
		.setDescription('API documentation for ft_transcendence')
		.setVersion('1.0.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}

bootstrap();
