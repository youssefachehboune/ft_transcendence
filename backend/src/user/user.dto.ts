import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { IsString, IsAlphanumeric, MaxLength, IsOptional, IsNotEmpty, IsDefined } from 'class-validator';

function IsUserData(options: Partial<ApiPropertyOptions>): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol): void {
    ApiProperty(options)(target, propertyKey);
    IsString()(target, propertyKey);
		if (options.description !== 'The new bio' && options.description !== 'The new location') {
			IsNotEmpty()(target, propertyKey);
			IsDefined()(target, propertyKey);
		}
    if (options.description === 'The new username') {
      MaxLength(15)(target, propertyKey);
      IsAlphanumeric()(target, propertyKey);
    } else if (options.description === 'The new bio') {
			IsOptional()(target, propertyKey);
      MaxLength(200)(target, propertyKey);
    } else if (options.description === 'The new firstName' || options.description === 'The new lastName') {
      MaxLength(15)(target, propertyKey);
			IsAlphanumeric()(target, propertyKey);
    } else if (options.description === 'The new location') {
			IsOptional()(target, propertyKey);
		}
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
  bio?: string;

  @IsUserData({
    description: 'The new firstName',
    example: 'John',
  })
  firstName: string;

  @IsUserData({
    description: 'The new lastName',
    example: 'Doe',
  })
  lastName: string;

  @IsUserData({
    description: 'The new location',
    example: 'Singapore',
  })
  location?: string;

  @IsUserData({
    description: 'The new avatar',
  })
  avatar: string;
}