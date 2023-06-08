import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

function IsUserData(options: Partial<ApiPropertyOptions>): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol): void {
    ApiProperty(options)(target, propertyKey);
    IsOptional()(target, propertyKey);
    IsString()(target, propertyKey);
  };
}

export class UserDto {
  @IsUserData({
    description: 'The new username',
    example: 'johndoe',
  })
	username: string;

  @IsUserData({
    description: 'The new bio',
    example: 'Adventurous soul with endless curiosity',
  })
	bio: string;

	@IsUserData({
    description: 'The new first name',
    example: 'John',
  })
	firstName: string;

	@IsUserData({
    description: 'The new last name',
    example: 'Doe',
  })
	lastName: string;

	@IsUserData({
    description: 'The new location',
    example: 'Singapore',
  })
	location: string;

	@IsUserData({
    description: 'The new avatar'
  })
	avatar: string;
}