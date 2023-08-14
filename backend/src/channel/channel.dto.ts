import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsAlphanumeric, IsEnum, IsNotEmpty, IsOptional, IsDefined, IsString, MaxLength, MinLength, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

enum ChannelType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  PROTECTED = 'PROTECTED',
}

@ValidatorConstraint({ name: 'password', async: false })
class PasswordValidator implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    const type = args.object['type'] as ChannelType;
    if (type === ChannelType.PUBLIC || type === ChannelType.PRIVATE) {
      return password === undefined || password === null || password === '';
    }
    if(type === ChannelType.PROTECTED) {
        return password !== undefined && password !== null && password !== '';
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const type = args.object['type'] as ChannelType;
    if (type === ChannelType.PUBLIC || type === ChannelType.PRIVATE) {
      return 'Password must be empty for public and private channels';
    }
    if(type === ChannelType.PROTECTED) {
        return 'Password must not be empty for protected channels';
    }
  }
}

export class miniChannelDto {
  @IsNotEmpty()
  @IsString()
	@IsAlphanumeric()
	@MaxLength(10)
	@IsDefined()
  @ApiProperty({
    description: 'The name of the channel',
    example: '42',
  })
  name: string;

	@IsNotEmpty()
  @IsString()
  @IsOptional()
	@MinLength(8)
  @ApiProperty({
    description: 'The password',
    example: 'bR^hW7f',
  })
  password?: string;
}

export class ChannelDTO {
  @IsNotEmpty()
  @IsString()
	@IsAlphanumeric()
	@MaxLength(10)
	@IsDefined()
  @ApiProperty({
    description: 'The name of the channel',
    example: '1337',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
	@IsDefined()
  @ApiProperty({
    description: 'The description of the channel',
    example: '1337',
  })
  description: string;

	@IsNotEmpty()
  @IsString()
	@IsDefined()
  @ApiProperty({
    description: 'The profile picture of the channel',
    example: 'http://example.com/',
  })
  avatar: string;

  @ApiProperty({
    enum: ChannelType,
    description: 'The type of the channel',
    example: 'PROTECTED',
  })
	@IsNotEmpty()
	@IsDefined()
  @IsEnum(ChannelType)
  type: ChannelType;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The password of the channel',
    example: '',
  })
  @Validate(PasswordValidator)
  password?: string;
}
